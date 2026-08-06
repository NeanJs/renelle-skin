import axios from "axios";

import { api } from "@/lib/api/client";

/*
|--------------------------------------------------------------------------
| Extract API Error Message
|--------------------------------------------------------------------------
*/

function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.data?.message ||
      fallbackMessage
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

/*
|--------------------------------------------------------------------------
| Get Authentication Token
|--------------------------------------------------------------------------
*/

function getAuthToken(): string {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token missing");
  }

  return token;
}

/*
|--------------------------------------------------------------------------
| Get Subscription
|--------------------------------------------------------------------------
*/

export async function getSubscription() {
  const token = getAuthToken();

  try {
    const { data } = await api.get("/subscription", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to load subscription"));
  }
}

/*
|--------------------------------------------------------------------------
| Pause Subscription
|--------------------------------------------------------------------------
*/

export async function pauseSubscription() {
  const token = getAuthToken();

  try {
    const { data } = await api.post(
      "/subscription/pause",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to pause subscription"));
  }
}

/*
|--------------------------------------------------------------------------
| Resume Subscription
|--------------------------------------------------------------------------
*/

export async function resumeSubscription() {
  const token = getAuthToken();

  try {
    const { data } = await api.post(
      "/subscription/resume",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to resume subscription"));
  }
}

/*
|--------------------------------------------------------------------------
| Cancel Subscription
|--------------------------------------------------------------------------
*/

export async function cancelSubscription() {
  const token = getAuthToken();

  try {
    const { data } = await api.post(
      "/subscription/cancel",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Unable to cancel subscription"));
  }
}
