import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import DOMPurify from "dompurify";
import { marked } from "marked";

const fetchPost = async (slug) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/${slug}`
  );
  return response.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });
  if (isPending) return "Loading...";
  if (error) return "Something went wrong: " + error.message;
  if (!data) return "Post not found!";
  const safeHTML = DOMPurify.sanitize(marked(data.content));
  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user?.userName}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.description}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} width={600} className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12">
        <div
          className="prose lg:text-lg flex flex-col gap-6 text-justify"
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        />

        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium"> Author</h1>
          <div className="flex- flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user?.img && (
                <img
                  src={data.user?.img}
                  className="w-12 h-12 rounded-full object-cover"
                  width={48}
                  height={48}
                />
              )}
              <Link className="text-blue-800">{data.user?.userName}</Link>
            </div>
            <p className="text-sm text-gray-500">
              Sed tortor sapien, vestibulum sit amet auctor sed, tristique quis
              velit.
            </p>
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/posts">
              All
            </Link>
            <Link className="underline" to="/posts?cat=web-design">
              Web Design
            </Link>
            <Link className="underline" to="/posts?cat=development">
              Development
            </Link>
            <Link className="underline" to="/posts?cat=databases">
              Databases
            </Link>
            <Link className="underline" to="/posts?cat=search-engine">
              Search Engines
            </Link>
            <Link className="underline" to="/posts?cat=marketing">
              Marketing
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
