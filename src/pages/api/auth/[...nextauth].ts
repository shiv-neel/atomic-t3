import { User } from '@prisma/client'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { trpc } from '../../../utils/trpc'
import * as bcrypt from 'bcrypt'

type UserCredentials = {
  email: string
  password: string
}

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as UserCredentials
        const user: User = trpc.user.getUserByEmail.useQuery({ email }).data
        if (!user) return null

        const doPasswordsMatch = trpc.user.comparePasswords.useQuery({ password, hashedPassword: user.password }).data
        if (doPasswordsMatch)
          return { id: user.email, name: user.name }
        return null
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {},
  secret: process.env.NEXTAUTH_SECRET,
})
