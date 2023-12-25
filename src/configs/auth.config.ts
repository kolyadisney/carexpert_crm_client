import type { AuthOptions, User } from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { setCookie } from 'cookies-next';

export const authConfig: AuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        login: {
          label: 'login',
          type: 'login',
          required: true,
        },
        password: {
          label: 'password',
          type: 'password',
          required: true,
        },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;
        try {
          const body: any = {
            login: credentials?.login,
            password: credentials?.password,
          };
          const res = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
          const user = await res.json();
          if (user) {
            cookies().set({
              name: 'access_token',
              value: user?.access_token,
            });
            cookies().set({
              name: 'refresh_token',
              value: user?.refresh_token,
            });
            return user as User;
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthOptions;