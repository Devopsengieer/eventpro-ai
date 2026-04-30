"use server";

import { prisma } from "../lib/db";

export async function getAllEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });
    return events.map((e) => ({ ...e, createdAt: e.createdAt.toISOString(), updatedAt: e.updatedAt.toISOString() }));
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function getEventById(id: number) {
  try {
    const e = await prisma.event.findUnique({ where: { id } });
    if (!e) return null;
    return { ...e, createdAt: e.createdAt.toISOString(), updatedAt: e.updatedAt.toISOString() };
  } catch (error) {
    return null;
  }
}

export async function getRelatedEvents(categoryId: string, excludeId: number) {
  try {
    const events = await prisma.event.findMany({
      where: { category: categoryId, id: { not: excludeId } },
      take: 3,
    });
    return events.map((e) => ({ ...e, createdAt: e.createdAt.toISOString(), updatedAt: e.updatedAt.toISOString() }));
  } catch (error) {
    return [];
  }
}
