import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import StarRatings from 'react-star-ratings';
import backgroundImage from '../Assets/conifers-1867371_1280.jpg'

const CustomerReview = () => {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]); // Mock data, replace with API

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([...reviews, { rating, comment, id: Date.now(), status: 'Pending' }]);
    setRating(0);
    setComment('');
  };

  return (
    <div
      className={`h-full overflow-auto ${isDarkMode ? 'dark:bg-gray-900' : ''}`}
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>Customer Review</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Review Form */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Submit a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <StarRatings
              rating={rating}
              starRatedColor="#F7B500"
              starEmptyColor="#D1D5DB"
              starDimension="24px"
              starSpacing="5px"
              changeRating={(newRating) => setRating(newRating)}
              numberOfStars={5}
            />
            <textarea
              placeholder="Your comments..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <input
              type="text"
              placeholder="Pickup ID"
              className={`w-full p-2 border rounded ${isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : 'border-gray-300'}`}
            />
            <button
              type="submit"
              className={`w-full p-2 bg-green-600 text-white rounded hover:bg-green-700 ${isDarkMode ? 'dark:bg-green-500 dark:hover:bg-green-600' : ''}`}
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className={`bg-white p-4 rounded-lg shadow-md ${isDarkMode ? 'dark:bg-gray-800 dark:shadow-gray-700' : ''}`}>
          <h2 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'dark:text-white' : ''}`}>Your Reviews</h2>
          <ul className="space-y-2">
            {reviews.map((review) => (
              <li key={review.id} className={`p-2 rounded ${isDarkMode ? 'dark:bg-gray-700' : 'bg-gray-100'}`}>
                <StarRatings
                  rating={review.rating}
                  starRatedColor="#F7B500"
                  starEmptyColor="#D1D5DB"
                  starDimension="16px"
                  starSpacing="3px"
                  numberOfStars={5}
                  readonly
                />
                <p className={isDarkMode ? 'dark:text-white' : 'text-gray-800'}>{review.comment}</p>
                <p className={isDarkMode ? 'dark:text-gray-400' : 'text-gray-500'}>Status: {review.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;