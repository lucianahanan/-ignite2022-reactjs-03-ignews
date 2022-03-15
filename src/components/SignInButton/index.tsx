import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
//import { signIn } from 'next-auth/client';
import { signIn, useSession, signOut } from 'next-auth/react';


export function SignInButton() {

//  const isUserLoggedIn = true;
//  const [session] = useSession();
  const { data: session, status } = useSession();

//  console.log(session); console.log(session.user.name);

  return session ? (

    <button type="button" className={styles.signInButton}>
    <FaGithub color="#04d361" />
    {session.user.name}
    <FiX color="#737380" className={styles.closeIcon} onClick={() => signOut()} />
    </button>

  ) : (

    <button type="button" className={styles.signInButton}
      onClick={() => signIn('github')} >
    <FaGithub color="#eba417" />
    Sign in with Github
    </button>

  )

}