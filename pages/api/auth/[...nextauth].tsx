import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        return profile.email.endsWith('@stonybrook.edu');
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
