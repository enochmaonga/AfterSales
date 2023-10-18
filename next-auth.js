import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password",  type: "password" },
      },
      authorize: async (credentials) => {
        const validUsername = 'emokua';
        const validPassword = '1234';

        if (credentials.username === validUsername && credentials.password === validPassword) {
          // Return an object with user information, e.g., id, name, email
          return Promise.resolve({ id: 1, name: 'Your Name', email: 'your@email.com' });
        } else {
          // Return null if authentication fails
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      // Add user id to the session
      session.user.id = user.id;
      return session;
    },
  },
  session: {
    jwt: true,
  },
});