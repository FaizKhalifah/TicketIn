import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const clearDatabase = async () => {
  try {
    // Mendapatkan semua tabel yang ada dalam schema public
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename FROM pg_tables WHERE schemaname='public'
    `;

    // Menyusun query TRUNCATE untuk setiap tabel
    for (const { tablename } of tables) {
      if (tablename !== '_prisma_migrations') {
        console.log(`Truncating table: ${tablename}`);
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" CASCADE;`);
      }
    }

    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error while clearing database:', error);
    throw error; // Penting agar error tertangkap saat testing
  }
};

export const seedDatabase = async () => {
    const tickets = [
      {
        eventName: 'Tech Conference 2025',
        eventDate: new Date('2025-03-15'),
        price: 100,
        userId: 1, // Pastikan userId ini valid di database Anda
      },
      {
        eventName: 'Computer Festival 2025',
        eventDate: new Date('2025-04-20'),
        price: 200,
        userId: 2,
      },
    ];
  
    try {
      // Menambahkan data ticket ke database
      for (const ticket of tickets) {
        await prisma.ticket.create({
          data: ticket,
        });
      }
  
      console.log('Database seeded successfully.');
    } catch (error) {
      console.error('Error while seeding database:', error);
      throw error; // Penting untuk error handling
    }
  };
  