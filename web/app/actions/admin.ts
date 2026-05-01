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

export async function getAdminEvents(page = 1, pageSize = 10) {
  await verifyAdmin();
  const skip = (page - 1) * pageSize;
  const [events, total] = await Promise.all([
    prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.event.count(),
  ]);
  return { events, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function deleteEvent(id: number) {
  await verifyAdmin();
  await prisma.event.delete({
    where: { id },
  });
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function getAdminUsers(page = 1, pageSize = 10) {
  await verifyAdmin();
  const skip = (page - 1) * pageSize;
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
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
    }),
    prisma.user.count(),
  ]);
  return { users, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function getAdminBookings(page = 1, pageSize = 10) {
  await verifyAdmin();
  const skip = (page - 1) * pageSize;
  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      include: {
        user: {
          select: { name: true, email: true },
        },
        event: {
          select: { title: true },
        },
      },
    }),
    prisma.booking.count(),
  ]);
  return { bookings, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function createEvent(formData: FormData) {
  try {
    await verifyAdmin();

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const priceStr = formData.get("price") as string;
    const image = formData.get("image") as string;
    const description = formData.get("description") as string;

    // Validation
    if (!title?.trim()) return { error: "Event title is required" };
    if (!category?.trim()) return { error: "Category is required" };
    if (!date?.trim()) return { error: "Date is required" };
    if (!time?.trim()) return { error: "Time is required" };
    if (!location?.trim()) return { error: "Location is required" };
    if (!description?.trim()) return { error: "Description is required" };
    if (!image?.trim()) return { error: "Event image is required" };
    
    const price = parseFloat(priceStr);
    if (isNaN(price) || price < 0) return { error: "Price must be a valid positive number" };
    
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) return { error: "Invalid date format" };

    let organizer, schedule, highlights;
    try {
      organizer = JSON.parse(formData.get("organizer") as string);
    } catch {
      return { error: "Invalid organizer JSON format" };
    }
    try {
      schedule = JSON.parse(formData.get("schedule") as string);
    } catch {
      return { error: "Invalid schedule JSON format" };
    }
    try {
      highlights = JSON.parse(formData.get("highlights") as string);
    } catch {
      return { error: "Invalid highlights JSON format" };
    }

    const data = {
      title,
      category,
      date,
      time,
      location,
      price,
      image,
      tag: formData.get("tag") as string,
      tagColor: formData.get("tagColor") as string,
      description,
      organizer,
      schedule,
      highlights,
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

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const date = formData.get("date") as string;
    const time = formData.get("time") as string;
    const location = formData.get("location") as string;
    const priceStr = formData.get("price") as string;
    const image = formData.get("image") as string;
    const description = formData.get("description") as string;

    // Validation
    if (!title?.trim()) return { error: "Event title is required" };
    if (!category?.trim()) return { error: "Category is required" };
    if (!date?.trim()) return { error: "Date is required" };
    if (!time?.trim()) return { error: "Time is required" };
    if (!location?.trim()) return { error: "Location is required" };
    if (!description?.trim()) return { error: "Description is required" };
    if (!image?.trim()) return { error: "Event image is required" };
    
    const price = parseFloat(priceStr);
    if (isNaN(price) || price < 0) return { error: "Price must be a valid positive number" };
    
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) return { error: "Invalid date format" };

    let organizer, schedule, highlights;
    try {
      organizer = JSON.parse(formData.get("organizer") as string);
    } catch {
      return { error: "Invalid organizer JSON format" };
    }
    try {
      schedule = JSON.parse(formData.get("schedule") as string);
    } catch {
      return { error: "Invalid schedule JSON format" };
    }
    try {
      highlights = JSON.parse(formData.get("highlights") as string);
    } catch {
      return { error: "Invalid highlights JSON format" };
    }

    const data = {
      title,
      category,
      date,
      time,
      location,
      price,
      image,
      tag: formData.get("tag") as string,
      tagColor: formData.get("tagColor") as string,
      description,
      organizer,
      schedule,
      highlights,
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

    // Validation
    if (!name?.trim()) return { error: "Full name is required" };
    if (!email?.trim()) return { error: "Email is required" };
    if (!password || password.length < 6) return { error: "Password must be at least 6 characters" };
    if (!role) return { error: "Role is required" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { error: "Invalid email format" };

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

// ── Category CRUD ──────────────────────────────────────────────────────────

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getAdminCategories(page = 1, pageSize = 10) {
  await verifyAdmin();
  const skip = (page - 1) * pageSize;
  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      skip,
      take: pageSize,
    }),
    prisma.category.count(),
  ]);
  
  // Get event counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const count = await prisma.event.count({
        where: { category: cat.name },
      });
      return { ...cat, _count: { events: count } };
    })
  );

  return { categories: categoriesWithCounts, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
}

export async function createCategory(formData: FormData) {
  try {
    await verifyAdmin();
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    const accent = formData.get("accent") as string;

    await prisma.category.create({
      data: { name, icon, accent },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    revalidatePath("/events");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create category" };
  }
}

export async function updateCategory(id: number, formData: FormData) {
  try {
    await verifyAdmin();
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    const accent = formData.get("accent") as string;

    await prisma.category.update({
      where: { id },
      data: { name, icon, accent },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    revalidatePath("/events");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to update category" };
  }
}

export async function deleteCategory(id: number) {
  try {
    await verifyAdmin();
    
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return { error: "Category not found" };

    const eventCount = await prisma.event.count({
      where: { category: category.name }
    });

    if (eventCount > 0) {
      return { error: `Cannot delete category "${category.name}" as it is being used by ${eventCount} events.` };
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    revalidatePath("/events");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete category" };
  }
}

