import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
const providers = [
  GithubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),
]

export default NextAuth({
  providers: providers,
  callbacks: {},
  secret: process.env.NEXTAUTH_SECRET,
})
