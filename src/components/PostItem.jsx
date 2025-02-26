import Image from "./Image";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const PostItem = ({ post }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-8">
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image
            src={post.img}
            className="rounded-2xl object-cover"
            width={735}
          />
        </div>
      )}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to={`/posts?author=${post.user.userName}`} className="text-blue-800"> {post.user?.userName}</Link>
          <span>on</span>
          <Link  to={`/posts?cat=${post.category}`}  className="text-blue-800"> {post.category} </Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>{post.description}</p>
        <Link to={`/${post.slug}`} className="underline text-blue-800 text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
