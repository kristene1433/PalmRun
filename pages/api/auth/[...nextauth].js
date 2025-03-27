import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../../../utils/db';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export default NextAuth({
  // Session behavior (30 min expiry, JWT-based)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes
    updateAge: 10 * 60, // refresh JWT every 10 mins
  },

  jwt: {
    maxAge: 30 * 60, // 30 minutes
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role || 'user',
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
});
