import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();
const client = createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_HOST,
    port: 14052,
  },
});
export default client;
