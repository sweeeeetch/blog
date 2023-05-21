import type { AxiosResponse } from "axios";
import $api from ".";

interface ManyPostsData {
  totalPages: number;
  posts: PostData[];
}
export interface PostData {
  id: string;
  title: string;
  text: string;
  author: string;
  userId: string;
  image?: string;
  date: string;
}

export interface CreatePostData {
  title: string;
  text: string;
  author: string;
  userId: string;
  image?: File;
}
interface PostEditData {
  title?: string;
  text?: string;
}

export const createPost = async (data: CreatePostData): Promise<AxiosResponse<PostData>> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("text", data.text);
  formData.append("author", data.author);
  formData.append("userId", data.userId);
  if (data.image) {
    formData.append("image", data.image);
  }
  return $api.post("/posts/create", formData);
};

export const getPosts = async (
  page: number,
  pageSize: number = 20
): Promise<AxiosResponse<ManyPostsData>> => {
  return $api.get(`/posts/get?page=${page}&pageSize=${pageSize}`);
};

export const getMyPosts = async (
  page: number,
  pageSize: number = 20
): Promise<AxiosResponse<ManyPostsData>> => {
  return $api.get(`/posts/myposts?page=${page}&pageSize=${pageSize}`);
};

export const getPost = async (id: string): Promise<AxiosResponse<PostData>> => {
  return $api.get(`/posts/get/${id}`);
};

export const editPost = async (id: string, data: PostEditData): Promise<void> => {
  return $api.put(`/posts/edit/${id}`, data);
};

export const deletePost = async (id: string): Promise<void> => {
  return $api.delete(`/posts/delete/${id}`);
};
