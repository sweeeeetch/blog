import type { AxiosResponse } from "axios";
import $api from ".";

export interface PostData {
  id: string;
  title: string;
  text: string;
  author: string;
  userId: string;
  image?: string;
  date: string;
}

interface PostEditData {
  title?: string;
  text?: string;
}

export const createPost = async (data: PostData): Promise<AxiosResponse<PostData>> => {
  return $api.post("/posts/create", data);
};

export const getPosts = async (): Promise<AxiosResponse<PostData[]>> => {
  return $api.get("/posts/get");
};

export const getMyPosts = async (): Promise<AxiosResponse<PostData[]>> => {
  return $api.get("/posts/myposts");
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
