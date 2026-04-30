"use server";

import { getCurrentUser } from "./auth";
import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function createBooking(eventId: number, ticketCount: number, totalAmount: number) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "You must be logged in to book an event." };
  }

  try {
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) return { error: "Event not found" };

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        eventId,
        ticketCount,
        totalAmount,
        status: "CONFIRMED",
      },
    });

    // Increment attendees in the event
    await prisma.event.update({
      where: { id: eventId },
      data: { attendees: { increment: ticketCount } },
    });

    revalidatePath("/my-bookings");
    revalidatePath(`/events/${eventId}`);
    revalidatePath("/events");

    return { success: true, bookingId: booking.id };
  } catch (error) {
    console.error(error);
    return { error: "Failed to process booking. Please try again." };
  }
}

export async function getMyBookings() {
  const user = await getCurrentUser();
  if (!user) return [];

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { event: true },
      orderBy: { createdAt: "desc" },
    });
    return bookings.map(b => ({
      ...b,
      cancelledAt: b.cancelledAt?.toISOString() || null,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
      event: {
        ...b.event,
        createdAt: b.event.createdAt.toISOString(),
        updatedAt: b.event.updatedAt.toISOString(),
      }
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function cancelBooking(bookingId: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Not logged in" };

  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.userId !== user.id) return { error: "Booking not found" };

    if (booking.status === "CANCELLED") return { error: "Already cancelled" };

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED", cancelledAt: new Date() }
    });

    await prisma.event.update({
      where: { id: booking.eventId },
      data: { attendees: { decrement: booking.ticketCount } }
    });

    revalidatePath("/my-bookings");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to cancel booking" };
  }
}
