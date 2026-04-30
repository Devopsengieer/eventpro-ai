import { PrismaClient } from "@prisma/client";
import { EVENTS } from "../app/lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  
  // Clear existing data
  await prisma.booking.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("Cleared existing database records.");

  // Create Admin User
  await prisma.user.create({
    data: {
      email: "admin@eventpro.ai",
      passwordHash: "adminpassword",
      name: "EventPro Admin",
      role: "ADMIN",
    }
  });
  console.log("Created admin user: admin@eventpro.ai / adminpassword");

  // Insert events
  for (const event of EVENTS) {
    await prisma.event.create({
      data: {
        id: event.id,
        title: event.title,
        category: event.category,
        date: event.date,
        time: event.time,
        location: event.location,
        price: event.price,
        attendees: event.attendees,
        image: event.image,
        tag: event.tag,
        tagColor: event.tagColor,
        featured: event.featured,
        description: event.description,
        organizer: event.organizer as any,
        schedule: event.schedule as any,
        highlights: event.highlights,
      },
    });
  }

  console.log(`Seeded ${EVENTS.length} events successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
