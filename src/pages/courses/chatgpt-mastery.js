import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function ChatGPTMasteryRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/courses/chatgpt-mastery-course');
  }, [router]);

  return (
    <Layout title="Redirecting...">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
          <p className="text-gray-600 mb-6">Taking you to the ChatGPT Mastery course page</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        </div>
      </div>
    </Layout>
  );
} 