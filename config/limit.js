import { rateLimit } from "express-rate-limit";

export const limite = () => {
  return rateLimit({
    windowMs: 30 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: (req, res) => {
      res.status(429).send({ status: 429, message: "calmate dedos rapidos" });
    },
  });
};