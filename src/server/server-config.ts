import * as dotenv from "dotenv";
dotenv.config();

export const PORT_SERVER = parseInt(process.env.VITE_PORT ?? "8000");
export const COOKIE_KEY_SERVER = process.env.VITE_COOKIE_KEY ?? "";
export const ENV_SERVER = process.env.VITE_ENV ?? "DEVELOPMENT";
export const HOST_SERVER = process.env.VITE_HOST ?? "0.0.0.0";
export const API_URL_SERVER = process.env.VITE_API_URL ?? "";
export const UI_URL = process.env.UI_URL ?? "localhost";
