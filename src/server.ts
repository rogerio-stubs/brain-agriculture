import express from "express";
import { routes } from "./routes";
import { prismaService } from "./prisma/prisma.service";
import { farmsSeeder } from "./shared/seeds/farms.seed";

const app = express();
app.use(express.json());

if (process.env.ENVIRONMENT === 'development') {
  console.log("Inserting farms...");
  farmsSeeder.insertFarms();
}

// Iniciar servidor
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
  routes(app);
});

process.on("SIGINT", async () => {
  console.log("Closing Prisma connection...");
  await prismaService.shutdown();
  process.exit(0);
});
