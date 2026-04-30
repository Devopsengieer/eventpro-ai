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
