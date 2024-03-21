import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function FirstPost() {
  const { data: session, status } = useSession();
  console.log(session);
  // If no session exists, display access denied message
  if (!session) {
    return (
      <>
        <Head>
          <title>Acerca de</title>
        </Head>
        <main>
          <h1>Acceso denegado</h1>
        </main>
      </>
    )
  }
}