import { PrismaClient, Role } from ".prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@roadsuraksha.gov.in' },
    update: {},
    create: {
      email: 'admin@roadsuraksha.gov.in',
      name: 'Abhilash Sagar',
      role: Role.SUPER_ADMIN,
    },
  });

  console.log({ admin });
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
