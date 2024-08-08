// app/page.js
import Head from 'next/head';
import ChatInterface from '../components/ChatInterface';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chatbot Interface</title>
        <meta name="description" content="A chatbot interface using Next.js and OpenAI API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <ChatInterface />
      </main>
    </div>
  );
}

