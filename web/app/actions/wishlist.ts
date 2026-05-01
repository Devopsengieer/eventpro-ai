"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../lib/db";
import { getCurrentUser } from "./auth";

export async function toggleWishlistItem(eventId: number) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId: eventId,
        },
      },
    });

    if (existing) {
      await prisma.wishlistItem.delete({
        where: { id: existing.id },
      });
    } else {
      await prisma.wishlistItem.create({
        data: {
          userId: user.id,
          eventId: eventId,
        },
      });
    }

    revalidatePath("/events");
    revalidatePath("/events/[id]", "page");
    revalidatePath("/wishlist");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Toggle Wishlist Error:", error);
    return { success: false, error: "Failed to toggle wishlist" };
  }
}

export async function getWishlistItems() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return [];
    }

    const items = await prisma.wishlistItem.findMany({
      where: { userId: user.id },
      include: {
        event: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return items;
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    return [];
  }
}
