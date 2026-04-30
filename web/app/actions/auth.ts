"use server";

import { cookies } from "next/headers";
import { prisma } from "../lib/db";

export async function signup(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "User already exists" };
    }

    // In a real app, hash the password! (e.g. bcrypt)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password, // MOCK HASH
      },
    });

    const cookieStore = await cookies();
    cookieStore.set("userId", user.id, { httpOnly: true, secure: true, path: "/" });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create account" };
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.passwordHash !== password) {
      return { error: "Invalid credentials" };
    }

    const cookieStore = await cookies();
    cookieStore.set("userId", user.id, { httpOnly: true, secure: true, path: "/" });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to login" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) return null;

  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });
  } catch (error) {
    return null;
  }
}
