import axios from "axios";
import type Note from "@/types/note";
import type { NoteTag } from "@/types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

interface CreateNoteResponse {
  note: Note;
}

interface DeleteNoteResponse {
  note: Note;
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "" } = params;

  const response = await axios.get<FetchNotesResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      perPage,
      search,
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createNote = async (
  noteData: CreateNoteParams
): Promise<Note> => {
  const response = await axios.post<CreateNoteResponse>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.note;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<DeleteNoteResponse>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.note;
};
