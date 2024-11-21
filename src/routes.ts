import { Express } from 'express';
import FarmRouter from "./farm/farm.routes";
import errorHandler from './shared/middlwware/error-handler.middleware';
import DashboardRouter from './dashboard/dashboard.routes';

// Registrar módulos
//TODO: verificar uma maneira de não ficar repetindo /api
export const routes = (app: Express) => {
  console.log("Registrando módulos...");
  app.use("/api", FarmRouter);
  app.use('/api', DashboardRouter);
  app.use(errorHandler)
};
