import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "types/user";

passport.serializeUser((userId: unknown, done) => {
  done(null, userId);
});

passport.deserializeUser((user: User, done) => {
  done(null, user as Express.User);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: process.env.CALLBACK_URL as string,
      passReqToCallback: true,
    },
    (_request, accessToken, refreshToken, profile, done) => {
      return done(null, { ...profile, accessToken, refreshToken });
    },
  ),
);
