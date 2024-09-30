import { PrismaClient } from "@prisma/client";

const dragverseDb = new PrismaClient({ log: ["info"] });

export { dragverseDb };
