import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
import GoogleProvider from "next-auth/providers/google";
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_ID!,
      clientSecret: process.env.YANDEX_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};
export { authOptions };