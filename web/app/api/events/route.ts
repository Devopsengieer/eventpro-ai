import { NextResponse } from "next/server";
import { getAllEvents } from "@/app/actions/event";

export async function GET() {
  const events = await getAllEvents();
  return NextResponse.json(events);
}
