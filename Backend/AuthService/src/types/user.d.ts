import { Profile } from "passport";

type User = Express.User;

interface GoogleAuthProfile extends Profile {
  accessToken: string;
  refreshToken: string;
}
