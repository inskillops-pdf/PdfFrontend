import { useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function MidjourneyMasteryCourse() {
  const [activeModule, setActiveModule] = useState(1);

  const courseCurriculum = [
    {
      id: 1,
      title: 'Midjourney Fundamentals',
      description: 'Get started with Midjourney and learn the essential commands',
      lessons: [
        { id: 1, title: 'Introduction to AI Image Generation', duration: '20 min' },
        { id: 2, title: 'Creating Your First Midjourney Images', duration: '25 min' },
        { id: 3, title: 'Basic Prompt Structure and Keywords', duration: '30 min' },
        { id: 4, title: 'Understanding Midjourney Versions', duration: '25 min' },
        { id: 5, title: 'Navigating the Discord Interface', duration: '15 min' }
      ]
    },
    {
      id: 2,
      title: 'Prompt Crafting for Images',
      description: 'Master the art of writing effective prompts for stunning visuals',
      lessons: [
        { id: 1, title: 'Creating Specific Visual Styles', duration: '35 min' },
        { id: 2, title: 'Using Reference Images with --img Parameter', duration: '30 min' },
        { id: 3, title: 'Color Control and Composition', duration: '25 min' },
        { id: 4, title: 'Controlling Lighting and Atmosphere', duration: '30 min' },
        { id: 5, title: 'Weighting Prompt Elements', duration: '25 min' }
      ]
    },
    {
      id: 3,
      title: 'Style Development',
      description: 'Create consistent visual styles and develop your unique aesthetic',
      lessons: [
        { id: 1, title: 'Finding Your Visual Voice', duration: '30 min' },
        { id: 2, title: 'Consistent Character Design', duration: '35 min' },
        { id: 3, title: 'Creating Style Libraries', duration: '25 min' },
        { id: 4, title: 'Remixing and Combining Styles', duration: '30 min' },
        { id: 5, title: 'From Concept to Final Image', duration: '40 min' }
      ]
    },
    {
      id: 4,
      title: 'Advanced Parameter Control',
      description: 'Fine-tune your images with Midjourney\'s advanced parameters',
      lessons: [
        { id: 1, title: 'Aspect Ratio and Resolution Control', duration: '25 min' },
        { id: 2, title: 'Using the --stylize Parameter', duration: '30 min' },
        { id: 3, title: 'Seed Values for Consistency', duration: '35 min' },
        { id: 4, title: 'Advanced Composition with --chaos', duration: '25 min' },
        { id: 5, title: 'Multi-step Generation Techniques', duration: '40 min' }
      ]
    },
    {
      id: 5,
      title: 'Commercial Application Workshop',
      description: 'Apply your Midjourney skills to real-world commercial projects',
      lessons: [
        { id: 1, title: 'Creating Professional Product Visuals', duration: '35 min' },
        { id: 2, title: 'Designing Marketing Campaign Assets', duration: '30 min' },
        { id: 3, title: 'Concept Art for Products and Spaces', duration: '40 min' },
        { id: 4, title: 'Understanding Licensing and Copyright', duration: '25 min' },
        { id: 5, title: 'Building a Midjourney Visual Portfolio', duration: '30 min' }
      ]
    }
  ];

  // Calculate total course duration
  const totalMinutes = courseCurriculum.reduce((total, module) => {
    return total + module.lessons.reduce((moduleTotal, lesson) => {
      return moduleTotal + parseInt(lesson.duration);
    }, 0);
  }, 0);
  
  // Format as hours
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const formattedDuration = `${totalHours} hours${remainingMinutes > 0 ? ` ${remainingMinutes} minutes` : ''}`;

  return (
    <Layout title="Midjourney Image Generation Mastery | AI Geneuron Courses">
      <div className="bg-primary-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Midjourney Image Generation Mastery</h1>
              <p className="text-xl text-gray-600">
                Create stunning AI-generated imagery for personal and commercial projects
              </p>
            </div>
            <div>
              <Link href="/courses/midjourney-mastery" className="btn-primary py-2 px-6">
                Back to Course Overview
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Course Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>{formattedDuration}</strong> of content</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span><strong>{courseCurriculum.length}</strong> modules</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span><strong>Certificate</strong> upon completion</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span><strong>Full support</strong> from instructors</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <Link href="/courses/midjourney-mastery/enroll" className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded text-center transition duration-150 ease-in-out">
                    Enroll in Course
                  </Link>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">Free Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/resources/midjourney-commands" className="text-primary-600 hover:text-primary-800 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Midjourney Command Reference
                      </Link>
                    </li>
                    <li>
                      <Link href="/resources/ai-image-cheatsheet" className="text-primary-600 hover:text-primary-800 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        AI Image Generation Cheatsheet
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <div className="space-y-6">
                  {courseCurriculum.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div 
                        className={`${
                          activeModule === module.id ? 'bg-primary-50 border-b border-gray-200' : 'bg-gray-50'
                        } px-6 py-4 cursor-pointer`}
                        onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="mr-3 text-primary-600 font-mono">
                              Module {module.id}
                            </span>
                            <h3 className="font-bold text-lg">{module.title}</h3>
                          </div>
                          <button className="text-gray-500">
                            <svg className={`w-5 h-5 transform ${activeModule === module.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-gray-600 mt-1">
                          {module.description}
                        </p>
                      </div>

                      {activeModule === module.id && (
                        <div className="bg-white border-t border-gray-200 px-6 py-4">
                          <ul className="space-y-4">
                            {module.lessons.map((lesson) => (
                              <li key={lesson.id} className="flex justify-between items-center">
                                <div className="flex items-start">
                                  <span className="text-gray-500 mr-3">{module.id}.{lesson.id}</span>
                                  <span>{lesson.title}</span>
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-6 flex justify-center">
                            <Link 
                              href={`/courses/midjourney-mastery/module/${module.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                            >
                              Start Module
                              <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-primary-900">Need Help?</h3>
                    <p className="mt-1 text-primary-700">
                      If you have any questions about the course or need help with specific topics, our team is here to support you. Access our community forum or contact the instructor directly.
                    </p>
                    <div className="mt-3">
                      <Link 
                        href="/support"
                        className="inline-flex items-center text-primary-600 hover:text-primary-900"
                      >
                        Get Support
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
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