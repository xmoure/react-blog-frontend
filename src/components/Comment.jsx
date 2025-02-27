import { format } from "timeago.js";
import Image from "./Image";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

const Comment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;

  const queryClient = useQueryClient();

  const mutation = useMutation({
      mutationFn: async () => {
        const token = await getToken();
        return axios.delete(
          `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        toast.success("Comment deleted!")
      },
      onError: (error) => {
        toast.error(error.response.data);
      },
    });

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment.user?.img  ? (
          <img
            src={comment.user.img}
            className="w-10 h-10 rounded-full object-cover"
            width={40}
          />
        ):
        <Image
            src="noIMage.jpeg"
            className="wM-10 h-10 rounded-full object-cover"
            width={40}
          />}
        <span className="font-medium">{comment.user?.userName}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user &&
          (comment.user.userName === user.username || role === "admin") && (
            <span onClick={() => mutation.mutate()} className="text-sm text-red-300 hover:text-red-500 cursor-pointer">
              Delete
              {mutation.isPending && <span>(in progress)</span>}
            </span>
          )}
      </div>
      <div className="mt-4">
        <p>{DOMPurify.sanitize(comment.description)}</p>
      </div>
    </div>
  );
};

export default Comment;
