import Comment from "./Comment";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import sanitizeHtml from "sanitize-html";
import { useState } from "react";

const fetchComments = async (postId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return response.data;
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setComment("");
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const sanitizedComment = sanitizeHtml(comment, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();

    if (!sanitizedComment) {
      toast.warn("Comment cannot be empty.");
      return;
    }
    mutation.mutate({ description: sanitizedComment });
  };

  if (isPending) return "Loading...";
  if (error)
    return (
      <p className="text-red-500">Something went wrong: {error.message}</p>
    );

  return (
    <div className="flex flex-col gap-8 lg:w-4/5 mb-12">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="description"
          placeholder="Write a comment..."
          className="w-full p-4 rounded-xl"
          value={comment}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={!comment.trim() || mutation.isPending}
          className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Error loading comments"
      ) : (
        <>
          {mutation.isPending && (
            <Comment
              comment={{
                description: `${mutation.variables.description} (Sending...)`,
                createdAt: new Date(),
                user: {
                  img: user.imageUrl,
                  userName: user.username,
                },
              }}
            />
          )}
          {data.length === 0 ? (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            data.map((comment) => (
              <Comment key={comment._id} comment={comment} postId={postId} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
