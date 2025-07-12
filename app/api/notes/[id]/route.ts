import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;
  const { data } = await api(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const cookieStore = await cookies();
  const { id } = await params;
  const { data } = await api.delete(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  if (data) {
    return NextResponse.json(data);
  }
  return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
}
