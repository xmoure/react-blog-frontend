import { useInfiniteQuery } from "@tanstack/react-query";
import PostItem from "./PostItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { fetchPosts } from "../utils/fetchPosts";
import { useMemo } from "react";


const PostsList = () => {
  const [searchParams] = useSearchParams();
  const { data, fetchNextPage, hasNextPage, status, isFetching } =
    useInfiniteQuery({
      queryKey: ["posts", searchParams?.toString()],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    });

  const allPosts = useMemo(
    () => data?.pages?.flatMap((page) => page.posts) || [],
    [data?.pages]
  );

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-bold text-2xl text-center">Loading...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-bold text-2xl text-center text-red-500">
          An error has occurred. Please try again.
        </p>
      </div>
    );
  }

  if (status === "success" && allPosts.length === 0) {
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
      loader={isFetching ? <h4>Loading more posts ...</h4> : null}
      endMessage={
        allPosts.length > 0 ? (
          <p>
            <b>All posts loaded!</b>
          </p>
        ) : null
      }
    >
      {allPosts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostsList;
