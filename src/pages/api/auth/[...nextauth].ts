import { query as q } from 'faunadb';

import NextAuth from 'next-auth';
//import NextAuth from 'next-auth/react';
import GitHubProvider from 'next-auth/providers/github';
import { fauna } from '../../../services/fauna';

export default NextAuth( {

  providers: [
    GitHubProvider( { 
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {    
          scope: 'read:user',
        }
      }
    } ),
  ],

  callbacks: {
    async signIn({ user, account, profile }) { // Tem que desestrurar agora

      //console.log(user);console.log(account);console.log(profile);
      const { email } = user;

      try {        

        await fauna.query(

          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )            
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )  
            )
          )
        )

        return true;

      } catch {

       // console.log( err );
        return false;
      }    
    },
  }

} )