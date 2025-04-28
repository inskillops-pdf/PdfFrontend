import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get ChatGPT Certified In <span className="text-primary-400">7 Days</span>
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Master the #1 AI skill used by top entrepreneurs and agencies. 152 bite-sized lessons, 99 AI bots, and bot builder trainings.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/signup" className="btn-primary text-center py-3 px-8 text-lg">
                Get Started
              </Link>
              <Link href="/courses" className="border border-white hover:bg-white hover:text-gray-900 text-center py-3 px-8 rounded text-lg transition duration-300">
                View Courses
              </Link>
            </div>
            
            <div className="mt-12">
              <p className="font-medium mb-4">What you'll learn:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>152 Bite-Sized Lessons</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>99 AI Bots</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Bot Builder Trainings</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-primary-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>17 Chatbots & Chatbot Trainings</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="relative h-96 md:h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-96">
                <Image
                  src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb"
                  alt="AI Robot"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 