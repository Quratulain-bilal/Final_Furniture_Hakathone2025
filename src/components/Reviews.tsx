import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import { toast } from "react-toastify";

// Define the type for a comment
interface Comment {
  _id: string; // Use _id from Sanity
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
const CommentSection: React.FC<{ productId: string }> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  // Fetch existing comments from Sanity
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await client.fetch(
          `*[_type == "comment" && productId == $productId]`,
          { productId }
        );
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments: ", error);
        toast.error("Failed to load comments.");
      }
    };

    fetchComments();
  }, [productId]);

  const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newName.trim() && newComment.trim() && rating > 0) {
      const newCommentItem = {
        _type: "comment",
        productId: productId,
        name: newName,
        text: newComment,
        rating: rating,
        createdAt: new Date().toISOString(),
      };

      try {
        const createdComment = await client.create(newCommentItem);
        setComments([
          ...comments,
          { ...newCommentItem, _id: createdComment._id },
        ]); // Add the new comment with its _id
        setNewName("");
        setNewComment("");
        setRating(0);
        toast.success("Comment added successfully!");
      } catch (error) {
        console.error("Error adding comment: ", error);
        toast.error("Failed to add comment. Please try again.");
      }
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      await client.delete(id); // Delete from Sanity
      setComments(comments.filter((comment) => comment._id !== id)); // Update local state
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment: ", error);
      toast.error("Failed to delete comment. Please try again.");
    }
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
        <button type="submit" className="mt-2 bg-black text-white p-2 rounded">
          Add Comment
        </button>
      </form>

      <div className="flex flex-wrap gap-4">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id} // Use _id from Sanity
              className="border w-64 p-4 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
            >
              <p className="font-semibold text-lg">
                {comment.name} - Rating:
                <span className="text-yellow-500"> {comment.rating} ★</span>
              </p>
              <p className="text-gray-700">{comment.text}</p>
              <button
                onClick={() => handleDeleteComment(comment._id)} // Use _id for deletion
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

export default CommentSection;
