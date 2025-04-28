import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import Link from 'next/link';
import MarkdownContent from '../../../components/MarkdownContent';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

// Fonction pour lire le contenu des fichiers markdown côté serveur
export async function getStaticProps() {
  try {
    const contentDirectory = path.join(process.cwd(), 'src/content');
    
    // Lire le contenu de la première leçon
    const lesson1Path = path.join(contentDirectory, 'module-1-lesson-1.md');
    const lesson1Content = fs.readFileSync(lesson1Path, 'utf8');
    
    // Lire le contenu de la deuxième leçon
    const lesson2Path = path.join(contentDirectory, 'module-1-lesson-2.md');
    const lesson2Content = fs.readFileSync(lesson2Path, 'utf8');
    
    // Liste des leçons avec leurs titres et contenus
    const lessons = [
      { 
        id: 1, 
        title: 'Introduction to AI and Large Language Models',
        duration: '15 min',
        content: lesson1Content
      },
      { 
        id: 2, 
        title: 'Understanding ChatGPT: Capabilities and Limitations',
        duration: '20 min',
        content: lesson2Content
      },
      { 
        id: 3, 
        title: 'Setting Up Your ChatGPT Workspace',
        duration: '10 min',
        content: '# Setting Up Your ChatGPT Workspace\n\nCette leçon est en cours de création.'
      },
      { 
        id: 4, 
        title: 'Free vs Paid: Which Plan Is Right For You?',
        duration: '15 min',
        content: '# Free vs Paid: Which Plan Is Right For You?\n\nCette leçon est en cours de création.'
      },
      { 
        id: 5, 
        title: 'Using the ChatGPT Interface Effectively',
        duration: '25 min',
        content: '# Using the ChatGPT Interface Effectively\n\nCette leçon est en cours de création.'
      }
    ];
    
    return {
      props: {
        lessons
      }
    };
  } catch (error) {
    console.error('Error loading markdown content:', error);
    return {
      props: {
        lessons: []
      }
    };
  }
}

export default function GitHubStyleModule({ lessons }) {
  const [activeLesson, setActiveLesson] = useState(1);
  const currentLesson = lessons.find(lesson => lesson.id === activeLesson) || lessons[0];
  
  const moduleData = {
    id: 1,
    title: 'Getting Started with ChatGPT',
    description: 'Introduction to AI concepts and the ChatGPT ecosystem',
  };

  return (
    <Layout title={`Module ${moduleData.id}: ${moduleData.title} | ChatGPT Mastery`}>
      <div className="bg-gray-100 py-8 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-2">
              <Link href="/courses" className="hover:text-blue-600">Courses</Link>
              <span>›</span>
              <Link href="/courses/chatgpt-mastery-course" className="hover:text-blue-600">ChatGPT Mastery</Link>
              <span>›</span>
              <span className="text-gray-900">Module {moduleData.id}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">Module {moduleData.id}: {moduleData.title}</h1>
            <p className="text-xl text-gray-600">{moduleData.description}</p>
          </div>
        </div>
      </div>
      
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Style GitHub */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-white rounded-md border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Module Contents</h3>
                </div>
                
                <nav className="py-2">
                  {lessons.map((lesson) => (
                    <button 
                      key={lesson.id}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        activeLesson === lesson.id 
                          ? 'bg-blue-50 border-l-4 border-blue-500' 
                          : 'border-l-4 border-transparent'
                      }`}
                      onClick={() => setActiveLesson(lesson.id)}
                    >
                      <div className="flex items-center">
                        <span className={`mr-2 font-mono text-xs ${
                          activeLesson === lesson.id 
                            ? 'text-blue-700' 
                            : 'text-gray-500'
                        }`}>
                          {lesson.id}.
                        </span>
                        <span className={`${
                          activeLesson === lesson.id 
                            ? 'font-medium text-blue-700' 
                            : 'text-gray-700'
                        }`}>
                          {lesson.title}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 ml-5 mt-1">
                        {lesson.duration}
                      </div>
                    </button>
                  ))}
                </nav>
                
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between">
                    <Link 
                      href="/courses/chatgpt-mastery-course" 
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Course Home
                    </Link>
                    
                    {moduleData.id < 8 && (
                      <Link 
                        href={`/courses/chatgpt-mastery/github-style-module?module=${moduleData.id + 1}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
                        Next Module
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                {/* Lesson Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {currentLesson.title}
                      </h2>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {currentLesson.duration} reading time
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                      <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Lesson Content */}
                <div className="px-6 py-6">
                  <MarkdownContent content={currentLesson.content} />
                </div>
                
                {/* Lesson Navigation */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                  {activeLesson > 1 ? (
                    <button 
                      onClick={() => setActiveLesson(activeLesson - 1)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous: {lessons[activeLesson - 2].title}
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {activeLesson < lessons.length && (
                    <button 
                      onClick={() => setActiveLesson(activeLesson + 1)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Next: {lessons[activeLesson].title}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Discussion Area */}
              <div className="mt-8 bg-white rounded-md border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Discussion (2)
                  </h3>
                </div>
                
                <div className="px-6 py-4">
                  <div className="mb-6">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Ask a question or share your thoughts
                    </label>
                    <textarea
                      id="comment"
                      rows="3"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Write a comment..."
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-bold text-gray-900">Michael Chen</h4>
                            <p className="text-sm text-gray-500">2 days ago</p>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>
                              I'm having trouble understanding the difference between GPT-3.5 and GPT-4. Is there a quick way to determine which one I should use for different tasks?
                            </p>
                          </div>
                          <div className="mt-4 flex space-x-4">
                            <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              Helpful (3)
                            </button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                          </div>
                          
                          <div className="mt-6 ml-6 p-4 bg-gray-50 rounded-md border border-gray-100">
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center">
                                  <h4 className="text-sm font-bold text-gray-900">Dr. Sarah Chen</h4>
                                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Instructor</span>
                                </div>
                                <div className="mt-1 text-sm text-gray-700">
                                  <p>
                                    Great question, Michael! GPT-4 generally excels at more complex tasks requiring sophisticated reasoning, while GPT-3.5 is cost-effective for simpler tasks. In Module 4, we'll cover a decision framework for choosing the right model based on your specific needs.
                                  </p>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                  1 day ago
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-bold text-gray-900">Alex Rodriguez</h4>
                            <p className="text-sm text-gray-500">1 day ago</p>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>
                              The examples in this module are really helpful. I especially like the markdown tables showing the comparison between different LLMs. Is there a way to export these tables for reference?
                            </p>
                          </div>
                          <div className="mt-4 flex space-x-4">
                            <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              Helpful (1)
                            </button>
                            <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 