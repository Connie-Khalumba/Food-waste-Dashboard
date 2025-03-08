import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import updateProfile
import { useUser } from '../context/UserContext';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setUserRole } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user.uid, user.email);

      // Fetch role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.exists() ? userDoc.data().role : (email.includes('@org.com') ? 'organization' : 'resident');
      setUserRole(role);

      // Set user in context immediately
      setUser(user);

      // Set displayName if not already set
      if (!user.displayName) {
        const displayName = email.split('@')[0]; // Fallback to email local part
        await updateProfile(user, { displayName }); // Use updateProfile function
        setUser({ ...user, displayName }); // Update context with new displayName
      }

      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.code, error.message);
      console.error('Firebase Auth instance:', auth);
      alert('Login failed: ' + error.message + ' (' + error.code + ')');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;