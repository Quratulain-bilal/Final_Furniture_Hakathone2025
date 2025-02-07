"use client";
import React, { useState, FormEvent } from "react";

// Define the type for a comment
interface Comment {
  id: number;
  name: string;
  text: string;
  rating: number;
}

// StarRating Component
const StarRating: React.FC<{
  rating: number;
  onRatingChange: (rating: number) => void;
}> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-${star <= rating ? "yellow-500" : "gray-300"} text-3xl`} // Yellow stars
          onClick={() => onRatingChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

// CommentSection Component
const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName.trim() && newComment.trim() && rating > 0) {
      const comment: Comment = {
        id: Date.now(),
        name: newName,
        text: newComment,
        rating: rating,
      };
      setComments([...comments, comment]);
      setNewName("");
      setNewComment("");
      setRating(0);
    }
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleAddComment} className="mb-4">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          required
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows={4}
          required
        />
        <StarRating rating={rating} onRatingChange={setRating} />
        <button
          type="submit"
          className="mt-2 bg-black text-white p-2 rounded"
        >
          Add Comment
        </button>
      </form>

      <div className="flex flex-wrap gap-4">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="border w-64 p-4 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
            >
              <p className="font-semibold text-lg">
                {comment.name} - Rating:
                <span className="text-yellow-500"> {comment.rating} ★</span>
              </p>
              <p className="text-gray-700">{comment.text}</p>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="text-red-500 mt-2 hover:underline"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <CommentSection />
    </div>
  );
};

export default App;
