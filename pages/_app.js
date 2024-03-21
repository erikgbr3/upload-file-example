import '@/styles/globals.css';
import '@/styles/slider.css';
import { SessionProvider } from "next-auth/react";

function App({ 
  Component, 
  pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;