import { useInfiniteQuery } from "@tanstack/react-query";
import PostItem from "./PostItem";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

const PostsList = () => {
  const [searchParams] = useSearchParams();
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["posts", searchParams?.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (status === "loading") return "Loading...";
  if (status === "error") return "An error has occurred";

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  if ( status === "success" && allPosts.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center h-64">
        <p className="text-bold text-2xl text-center">
          There are no posts that match your query
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts ...</h4>}
      endMessage={
        <p>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostsList;
