"use server";

import { prisma } from "@/app/lib/db";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";

async function verifyAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function getAdminStats() {
  await verifyAdmin();

  const [userCount, eventCount, bookingCount, totalRevenue] = await Promise.all([
    prisma.user.count(),
    prisma.event.count(),
    prisma.booking.count(),
    prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: "CONFIRMED",
      },
    }),
  ]);

  return {
    users: userCount,
    events: eventCount,
    bookings: bookingCount,
    revenue: totalRevenue._sum.totalAmount || 0,
  };
}

export async function getAdminEvents() {
  await verifyAdmin();
  return await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteEvent(id: number) {
  await verifyAdmin();
  await prisma.event.delete({
    where: { id },
  });
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function getAdminUsers() {
  await verifyAdmin();
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: { bookings: true },
      },
    },
  });
}

export async function getAdminBookings() {
  await verifyAdmin();
  return await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true },
      },
      event: {
        select: { title: true },
      },
    },
  });
}

export async function createEvent(formData: FormData) {
  try {
    await verifyAdmin();

    const data = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      price: parseFloat(formData.get("price") as string),
      image: formData.get("image") as string,
      tag: formData.get("tag") as string,
      tagColor: formData.get("tagColor") as string,
      description: formData.get("description") as string,
      organizer: JSON.parse(formData.get("organizer") as string),
      schedule: JSON.parse(formData.get("schedule") as string),
      highlights: JSON.parse(formData.get("highlights") as string),
      featured: false,
    };

    const event = await prisma.event.create({ data });
    revalidatePath("/admin/events");
    revalidatePath("/events");
    return { success: true, id: event.id };
  } catch (error: any) {
    console.error(error);
    return { error: error.message || "Failed to create event" };
  }
}

export async function updateEvent(id: number, formData: FormData) {
  try {
    await verifyAdmin();

    const data = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      location: formData.get("location") as string,
      price: parseFloat(formData.get("price") as string),
      image: formData.get("image") as string,
      tag: formData.get("tag") as string,
      tagColor: formData.get("tagColor") as string,
      description: formData.get("description") as string,
      organizer: JSON.parse(formData.get("organizer") as string),
      schedule: JSON.parse(formData.get("schedule") as string),
      highlights: JSON.parse(formData.get("highlights") as string),
    };

    await prisma.event.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/events");
    revalidatePath(`/events/${id}`);
    revalidatePath("/events");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error: error.message || "Failed to update event" };
  }
}

// ── User CRUD ──────────────────────────────────────────────────────────

export async function createUser(formData: FormData) {
  try {
    await verifyAdmin();

    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return { error: "A user with this email already exists" };

    await prisma.user.create({
      data: { email, name, passwordHash: password, role: role as any },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { error: error.message || "Failed to create user" };
  }
}

export async function updateUserRole(userId: string, role: string) {
  try {
    await verifyAdmin();
    await prisma.user.update({
      where: { id: userId },
      data: { role: role as any },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update user" };
  }
}

export async function deleteUser(userId: string) {
  try {
    const admin = await verifyAdmin();
    if (admin.id === userId) return { error: "Cannot delete yourself" };

    // Delete user's bookings first
    await prisma.booking.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete user" };
  }
}

// ── Admin Booking Management ───────────────────────────────────────────

export async function adminCancelBooking(bookingId: string) {
  try {
    await verifyAdmin();
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) return { error: "Booking not found" };
    if (booking.status === "CANCELLED") return { error: "Already cancelled" };

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED", cancelledAt: new Date() },
    });

    await prisma.event.update({
      where: { id: booking.eventId },
      data: { attendees: { decrement: booking.ticketCount } },
    });

    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to cancel booking" };
  }
}
