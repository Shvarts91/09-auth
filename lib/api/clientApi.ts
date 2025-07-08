import {  User } from "@/types/user";
import { nextServer } from "./api";
import { type AxiosResponse } from "axios";
import type { CreateNoteType, Note, NotesResponse } from "../../types/note";



export interface LoginRequest {
  email: string;
  password: string;
}

export const fetchNotes = async (
  page: number = 1,
  search: string = "",
  tag?: string
): Promise<NotesResponse> => {
  const perPage = 12;

  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim()) {
    params.search = search;
  }

  if (tag && tag.toLowerCase() !== "all") {
    params.tag = tag;
  }

  const response: AxiosResponse<NotesResponse> = await nextServer.get(
    "/notes",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
      params,
    }
  );

  return response.data;
};

export const createNote = async (payload: CreateNoteType): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", payload, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const deleteNoteById = async (id: number): Promise<Note> => {
  const response = await nextServer.delete<Note>(
    `/notes/:${id}`,

    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

export const getSingleNote = async (id: number): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/:${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const register = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/register", data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const response = await nextServer.post<User>("/auth/login", data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/auth/me");
  return data;
};
export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
