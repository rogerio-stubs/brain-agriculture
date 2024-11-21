"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const prisma_service_1 = require("./prisma/prisma.service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Iniciar servidor
app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
    (0, routes_1.routes)(app);
});
process.on("SIGINT", async () => {
    console.log("Closing Prisma connection...");
    await prisma_service_1.prismaService.shutdown();
    process.exit(0);
});
