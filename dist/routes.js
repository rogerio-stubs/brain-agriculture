"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const farm_routes_1 = __importDefault(require("./farm/farm.routes"));
const error_handler_middleware_1 = __importDefault(require("./shared/middlwware/error-handler.middleware"));
const dashboard_routes_1 = __importDefault(require("./dashboard/dashboard.routes"));
// Registrar módulos
//TODO: verificar uma maneira de não ficar repetindo /api
const routes = (app) => {
    console.log("Registrando módulos...");
    app.use("/api", farm_routes_1.default);
    app.use('/api', dashboard_routes_1.default);
    app.use(error_handler_middleware_1.default);
};
exports.routes = routes;
