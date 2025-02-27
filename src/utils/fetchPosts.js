import axios from "axios";

export const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};


export const fetchFeaturedPosts = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return response.data;
};

export const fetchPost = async (slug) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/${slug}`
  );
  return response.data;
};