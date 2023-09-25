import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { validarToken } from "./jwt.js";


passport.use(
  new BearerStrategy({ passReqToCallback: true }, async (req, token, done) => {
    const usuario = await validarToken(req, token);
    if (!usuario) return done(null, false);
    return done(null, usuario);
  })
);
export default passport;