import { NextResponse } from "next/server";
import { getEventById } from "@/app/actions/event";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const event = await getEventById(Number(params.id));
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json(event);
}
