import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Network error
    if (!error.response) {
      console.error("Network error");
      return Promise.reject(new Error("Unable to connect to the server."));
    }

    const { status, data } = error.response;

    switch (status) {
      case 400:
        console.error(data.message);
        break;

      case 401:
        console.error("Unauthorized");

        // optional:
        // localStorage.removeItem("token");

        break;

      case 403:
        console.error("Forbidden");
        break;

      case 404:
        console.error("Not found");
        break;

      case 500:
        console.error("Server error");
        break;

      default:
        console.error(data.message ?? "Unexpected error");
    }

    return Promise.reject(error);
  },
);
