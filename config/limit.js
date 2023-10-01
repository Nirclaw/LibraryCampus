import { rateLimit } from "express-rate-limit";

export const limite = () => {
  return rateLimit({
    windowMs: 30 * 1000,
    max: 800000,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req, res) => {
      res.status(429).send({ status: 429, message: "calmate dedos rapidos" });
    },
  });
};