// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text", placeholder: "john.doe@scorealchemy.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            // Appel à l'endpoint Django pour obtenir { access, refresh }
            const res = await fetch("http://localhost:8000/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: credentials?.email,
                    password: credentials?.password
                })
            });

            const user = await res.json();

            if (!res.ok) {
                throw new Error(user.detail || "Erreur lors de la connexion");
              }
    
            
          
            if (user) {
              return user
            } else {
              return null
            }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user}) {
          // Initial sign in
          if (user) {
            return {
              ...token,
              ...user,
              ...(user.user && { user: user.user })
            };
          }

          // Check if access token is expired
          const currentTime = Math.floor(Date.now() / 1000);
          const tokenExpired = token.exp && currentTime > token.exp;

          // If token is not expired, return the existing token
          if (!tokenExpired) {
            return token;
          }

          // Token is expired, try to refresh it
          try {
            const response = await fetch("http://localhost:8000/auth/refresh/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                refresh: token.refresh,
              }),
            });

            const refreshedTokens = await response.json();

            if (!response.ok) {
            
              throw refreshedTokens;
            }

            return {
              ...token,
              access: refreshedTokens.access,
              exp: refreshedTokens.exp || Math.floor(Date.now() / 1000) + 2 * 60 * 60, // Default 2 hours if exp not provided
              refresh: refreshedTokens.refresh || token.refresh,
            };
          } catch (error) {
            console.error("Error refreshing access token", error);
            // Return the existing token, the user will need to sign in again
            return { ...token, error: "RefreshAccessTokenError" };
          }
        },
        async session({ session, token }) {
          // Restructure the session to have user data directly accessible
          if (token.user) {
            // If user data is nested in a 'user' property
            session.user = {
              ...token.user,
              access: token.access || '',
              refresh: token.refresh || '',
              exp: token.exp || 0,
              iat: token.iat || 0,
              jti: token.jti || ''
            };
          } else {
            // If user data is directly on the token
            session.user = {
              id: token.id || '',
              email: token.email || '',
              username: token.username || '',
              firstname: token.firstname || '',
              lastname: token.lastname || '',
              avatar: token.avatar || '',
              access: token.access || '',
              refresh: token.refresh || '',
              exp: token.exp || 0,
              iat: token.iat || 0,
              jti: token.jti || ''
            };
          }

          // Add the access token to the session
          return session;
        },
      },
      pages: {
        signIn: '/auth/login',
      },
      session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
})