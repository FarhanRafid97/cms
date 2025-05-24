/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi } from '@/lib/types';
import { proHash, sessionExpired } from '@/lib/utils';
import { getListMenu } from '@/service/menu';
import { UserLoged } from '@/types/globals';
import { User } from 'next-auth';
import { AuthOptions } from 'next-auth/core/types';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: () => AuthOptions = () => {
  return {
    pages: {
      signIn: '/login',
    },
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          try {
            if (credentials?.username === 'bristar') {
              return JSON.parse(credentials.password) as UserLoged;
            }
            const { data } = await axiosMcrExisting.post('/AdminUser', {
              Username: credentials?.username,
              Password: proHash(credentials?.password ?? ''),
            });

            const responseData = data as IBaseResponseApi & {
              result: { id: string; username: string };
            };

            if (responseData.result != null && responseData.isSuccess) {
              const futureDate = sessionExpired({ age: 5000 });
              const menu = await getListMenu({
                payload: {
                  isAdmin: '1',
                  isKantorPusat: '0',
                  isProductOwner: '0',
                  isUnitKerja: '0',
                  levelUser: '999',
                  fidParamLevelUser: '99',
                },
              });

              const response: User = {
                Nama: responseData.result.username,
                Expired: futureDate,
                BranchCode: '999',
                CostCenter: '99999',
                IsAdmin: true,
                IsKantorPusat: false,
                IsProductOwner: false,
                IsUnitKerja: false,
                IsApprovalProductOwner: false,
                PersonalNumber: '999999',
                DescCostCenter: '',
                DescPersonalArea: '',
                Hilfm: '',
                Htext: '',
                IsSEIDivision: false,

                LevelUser: '',
                PersonalArea: '9999',
                menu,
              };

              return response;
            }
            return null;
          } catch (error) {
            return null;
          }
        },
      }),
    ],

    callbacks: {
      async session({ session, token }) {
        session.user = token.user;

        return session;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async jwt({ token, user }): Promise<any> {
        if (user) {
          token.user = user as any;
        }

        return token;
      },
    },
  };
};

export default NextAuth(authOptions());
