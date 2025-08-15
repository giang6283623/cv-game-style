import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to: ${config.url}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// User interfaces
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Post interfaces
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostData {
  title: string;
  body: string;
  userId: number;
}

// API functions
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const getUser = async (id: number): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error);
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>("/posts");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
};

export const getPost = async (id: number): Promise<Post> => {
  try {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch post ${id}:`, error);
    throw error;
  }
};

export const createPost = async (postData: CreatePostData): Promise<Post> => {
  try {
    const response = await api.post<Post>("/posts", postData);
    return response.data;
  } catch (error) {
    console.error("Failed to create post:", error);
    throw error;
  }
};

export const updatePost = async (
  id: number,
  postData: Partial<CreatePostData>
): Promise<Post> => {
  try {
    const response = await api.put<Post>(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update post ${id}:`, error);
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    console.error(`Failed to delete post ${id}:`, error);
    throw error;
  }
};

export default api;
