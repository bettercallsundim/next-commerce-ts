import limiter from "express-rate-limit";

export const rateLimit = limiter({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});
