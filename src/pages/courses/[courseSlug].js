import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { CourseService } from '../../services/course.service';
import { PaymentService } from '../../services/payment.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { AuthService } from '../../services/auth.service';

export default function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasing, setPurchasing] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  
  const router = useRouter();
  const { courseSlug } = router.query;
  
  const courseService = new CourseService();
  const paymentService = new PaymentService();
  const enrollmentService = new EnrollmentService();
  const authService = new AuthService();

  // Static course data (fallback)
  const allCourses = [
    {
      id: 'chatgpt-mastery',
      ref: 'COURSE-6-A0GWYK',
      title: 'ChatGPT Mastery',
      description: 'Learn how to leverage ChatGPT for business applications and content creation. Master prompt engineering and get the most out of AI language models.',
      image: 'https://images.unsplash.com/photo-1678995632928-298d05d41671',
      level: 'Beginner',
      duration: '12 hours',
      lessonsCount: 152,
      price: 199,
      rating: 4.8,
      reviewCount: 429,
      category: 'ai-tools',
      fullDescription: `
        <p>This comprehensive course will teach you everything you need to know about using ChatGPT effectively in your business and creative endeavors.</p>
        <p>You'll learn advanced prompt engineering techniques, how to optimize outputs for different use cases, and strategies for integrating ChatGPT into various workflows.</p>
        <h3>What you'll learn:</h3>
        <ul>
          <li>Master prompt engineering techniques for optimal results</li>
          <li>Create effective system messages to guide AI behavior</li>
          <li>Develop custom workflows for content creation</li>
          <li>Build AI-powered tools using the ChatGPT API</li>
          <li>Apply best practices for AI-assisted writing and editing</li>
        </ul>
      `,
      curriculum: [
        { title: 'Introduction to ChatGPT', lessons: 12 },
        { title: 'Prompt Engineering Fundamentals', lessons: 24 },
        { title: 'Advanced Prompting Techniques', lessons: 36 },
        { title: 'Building Business Applications', lessons: 48 },
        { title: 'Content Creation Workflows', lessons: 32 }
      ],
      instructor: {
        name: 'Dr. Sarah Chen',
        bio: 'AI researcher and prompt engineering expert with over 8 years of experience in natural language processing.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      }
    },
    {
      id: 'ai-bot-builder',
      ref: 'COURSE-7-PJKSRN',
      title: 'AI Bot Builder',
      description: 'Create custom AI bots for customer service, sales, and lead generation. Learn practical bot development with real-world applications.',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008',
      level: 'Intermediate',
      duration: '18 hours',
      lessonsCount: 97,
      price: 249,
      rating: 4.6,
      reviewCount: 312,
      category: 'development',
      fullDescription: `
        <p>Dive into the world of AI chatbot development with this hands-on course focused on building practical, business-ready bots.</p>
        <p>You'll learn to create intelligent virtual assistants that can handle customer inquiries, qualify leads, process orders, and more.</p>
        <h3>What you'll learn:</h3>
        <ul>
          <li>Design conversational flows for effective user interactions</li>
          <li>Implement natural language understanding capabilities</li>
          <li>Build bots that integrate with popular messaging platforms</li>
          <li>Create domain-specific knowledge bases for your bots</li>
          <li>Implement analytics to measure and improve bot performance</li>
        </ul>
      `,
      curriculum: [
        { title: 'Bot Design Principles', lessons: 14 },
        { title: 'Conversation Flow Architecture', lessons: 18 },
        { title: 'NLP Integration', lessons: 23 },
        { title: 'Platform Deployment', lessons: 16 },
        { title: 'Analytics and Optimization', lessons: 26 }
      ],
      instructor: {
        name: 'Mark Rodriguez',
        bio: 'Chatbot developer and AI consultant who has built solutions for Fortune 500 companies.',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'
      }
    },
    {
      id: 'prompt-engineering',
      ref: 'COURSE-8-OBCVJO',
      title: 'Advanced Prompt Engineering',
      description: 'Master the art of crafting effective prompts for any AI model. Unlock the full potential of AI through strategic and creative prompting.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
      level: 'Advanced',
      duration: '8 hours',
      lessonsCount: 48,
      price: 149,
      rating: 4.9,
      reviewCount: 271,
      category: 'ai-tools',
      fullDescription: `
        <p>Take your prompt engineering skills to the expert level with this advanced course on crafting highly effective prompts.</p>
        <p>Learn techniques that work across different AI models, understand the underlying principles, and develop a systematic approach to prompt design.</p>
        <h3>What you'll learn:</h3>
        <ul>
          <li>Advanced techniques for controlling AI outputs</li>
          <li>Model-specific optimization strategies</li>
          <li>Chain-of-thought and multi-step reasoning approaches</li>
          <li>Creative applications of prompt engineering</li>
          <li>Troubleshooting and refining underperforming prompts</li>
        </ul>
      `,
      curriculum: [
        { title: 'Prompt Engineering Theory', lessons: 8 },
        { title: 'Advanced Control Techniques', lessons: 12 },
        { title: 'Multi-model Prompt Strategies', lessons: 10 },
        { title: 'Creative Applications Workshop', lessons: 8 },
        { title: 'Optimization and Testing', lessons: 10 }
      ],
      instructor: {
        name: 'Aisha Johnson',
        bio: 'Leading prompt engineer who has worked with major AI labs and written extensively on prompt design.',
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e'
      }
    },
    {
      id: 'midjourney-mastery',
      ref: 'MIDJOURNEY-MASTERY-001',
      title: 'Midjourney Image Generation Mastery',
      description: 'Create stunning AI-generated artwork and imagery with Midjourney. Learn advanced techniques for creating commercial-quality visuals.',
      image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c',
      level: 'Beginner',
      duration: '10 hours',
      lessonsCount: 72,
      price: 179,
      rating: 4.7,
      reviewCount: 183,
      category: 'ai-tools',
      fullDescription: `
        <p>This course teaches you how to master Midjourney for creating stunning AI-generated visual content for personal and commercial use.</p>
        <p>From basic prompts to advanced techniques, you'll learn how to create exactly the images you want and develop your unique style.</p>
        <h3>What you'll learn:</h3>
        <ul>
          <li>Crafting effective prompts for precise image generation</li>
          <li>Understanding parameter settings and their effects</li>
          <li>Creating consistent styles and characters</li>
          <li>Techniques for photorealistic imagery</li>
          <li>Commercial applications and workflow integration</li>
        </ul>
      `,
      curriculum: [
        { title: 'Midjourney Fundamentals', lessons: 10 },
        { title: 'Prompt Crafting for Images', lessons: 18 },
        { title: 'Style Development', lessons: 15 },
        { title: 'Advanced Parameter Control', lessons: 17 },
        { title: 'Commercial Application Workshop', lessons: 12 }
      ],
      instructor: {
        name: 'Carlos Wei',
        bio: 'Digital artist and AI prompt specialist who has created campaigns for major brands using AI-generated imagery.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      }
    },
    {
      id: 'ai-business-integration',
      ref: 'AI-BUSINESS-INTEGRATION-001',
      title: 'AI Business Integration',
      description: 'Implement AI solutions in your business operations. Increase efficiency, reduce costs, and drive innovation with practical AI implementations.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
      level: 'Intermediate',
      duration: '15 hours',
      lessonsCount: 88,
      price: 299,
      rating: 4.5,
      reviewCount: 156,
      category: 'business',
      fullDescription: `
        <p>Learn how to successfully integrate AI solutions into your business operations to drive real results.</p>
        <p>This practical course focuses on implementation strategy, change management, and measuring the ROI of AI initiatives.</p>
        <h3>What you'll learn:</h3>
        <ul>
          <li>Identifying high-value AI use cases for your business</li>
          <li>Building effective AI implementation roadmaps</li>
          <li>Managing organizational change during AI adoption</li>
          <li>Selecting and working with AI vendors and solutions</li>
          <li>Measuring and optimizing AI implementation results</li>
        </ul>
      `,
      curriculum: [
        { title: 'AI Value Assessment', lessons: 12 },
        { title: 'Implementation Strategy', lessons: 18 },
        { title: 'Change Management', lessons: 15 },
        { title: 'Vendor Selection', lessons: 20 },
        { title: 'ROI Measurement Framework', lessons: 23 }
      ],
      instructor: {
        name: 'Jennifer Liu',
        bio: 'Former CTO and business consultant specializing in AI transformation for mid-size and enterprise businesses.',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'
      }
    },
    {
      id: 'llm-fine-tuning',
      ref: 'LLM-FINE-TUNING-001',
      title: 'LLM Fine-Tuning & Training',
      description: 'Learn to train and fine-tune large language models for specific business applications. Create custom AI models tailored to your needs.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
      level: 'Advanced',
      duration: '20 hours',
      lessonsCount: 115,
      price: 349,
      rating: 4.8,
      reviewCount: 97,
      category: 'development',
      fullDescription: `
        <p>This technical course teaches you how to customize large language models through fine-tuning and specialized training approaches.</p>
        <p>You'll learn to create domain-specific models that excel at particular tasks relevant to your business needs.</p>
        <h3>What you'll learn:</h3>
        <ul>
          <li>Fundamentals of language model architecture</li>
          <li>Data preparation for fine-tuning</li>
          <li>Implementing efficient training workflows</li>
          <li>Evaluating model performance</li>
          <li>Deploying custom models in production</li>
        </ul>
      `,
      curriculum: [
        { title: 'LLM Architecture Overview', lessons: 14 },
        { title: 'Data Collection and Preparation', lessons: 22 },
        { title: 'Fine-tuning Techniques', lessons: 28 },
        { title: 'Evaluation Frameworks', lessons: 18 },
        { title: 'Deployment Strategies', lessons: 33 }
      ],
      instructor: {
        name: 'Dr. Michael Patel',
        bio: 'Machine learning researcher and practitioner with expertise in NLP and language model training.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a'
      }
    }
  ];

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        // Don't redirect immediately, let user see the course but show login prompt
        console.log('User not authenticated');
      }
    };

    checkAuth();

    if (courseSlug) {
      fetchCourseDetails();
    }
  }, [courseSlug]);

  const checkEnrollmentStatus = async (courseRef) => {
    if (!isAuthenticated) {
      setIsEnrolled(false);
      setEnrollmentStatus(null);
      return;
    }

    try {
      const response = await enrollmentService.getAllEnrollmentsByUserInSession();
      if (response.success && response.data) {
        const userEnrollment = response.data.find(enrollment => 
          enrollment.course?.ref === courseRef
        );
        
        if (userEnrollment) {
          setIsEnrolled(true);
          setEnrollmentStatus(userEnrollment.enrollmentStatus);
        } else {
          setIsEnrolled(false);
          setEnrollmentStatus(null);
        }
      }
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      setIsEnrolled(false);
      setEnrollmentStatus(null);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from API first
      if (isAuthenticated) {
        try {
          const response = await courseService.getCourseById(courseSlug);
          if (response.success) {
            setCourse(response.data);
            // Check enrollment status after getting course data
            await checkEnrollmentStatus(response.data.ref);
            return;
          }
        } catch (apiError) {
          console.log('API fetch failed, using static data:', apiError);
        }
      }
      
      // Fallback to static data
      const staticCourse = allCourses.find(c => c.id === courseSlug);
      if (staticCourse) {
        setCourse(staticCourse);
        // Check enrollment status for static course
        await checkEnrollmentStatus(staticCourse.ref);
      }
    } catch (err) {
      console.error('Error fetching course details:', err);
      setError('Failed to load course details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      setPurchasing(true);
      setError(null);

      // Get current user for email
      const currentUser = authService.getCurrentUser();

      // Create payment request matching Spring Boot DTO
      const paymentRequest = {
        currency: 'USD',
        quantity: 1,
        name: course.title,
        duration: 30, // You might want to make this configurable or get from course
        email: currentUser?.email || ''
      };

      // Call checkout endpoint using the course reference
      const response = await paymentService.checkoutCourse(paymentRequest, course.ref);
      
      if (response.success && response.data?.sessionUrl) {
        // Redirect to Stripe checkout using sessionUrl
        window.location.href = response.data.sessionUrl;
      } else {
        setError('Failed to create checkout session. Please try again.');
      }
    } catch (err) {
      console.error('Error purchasing course:', err);
      setError('Failed to process purchase. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleBuy = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      setEnrolling(true);
      setError(null);

      // Since enrollment creation is not available in the backend,
      // we'll redirect to checkout or show a message
      // For now, redirect to checkout with the course information
      router.push(`/checkout?course=${course.id}&ref=${course.ref}`);
      
    } catch (err) {
      console.error('Error processing course purchase:', err);
      setError('Failed to process course purchase. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  // If course not found or still loading (router.query.courseSlug might be undefined during initial render)
  if (!course && router.isReady) {
    return (
      <Layout title="Course Not Found - AI Geneuron Courses">
        <div className="container-custom py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">
              We couldn't find the course you're looking for.
            </p>
            <Link href="/courses" className="btn-primary py-2 px-6">
              Browse All Courses
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // If still loading or course data not yet available
  if (!course) {
    return (
      <Layout title="Loading... - AI Geneuron Courses">
        <div className="container-custom py-20">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show error if any
  if (error) {
    return (
      <Layout title="Error - AI Geneuron Courses">
        <div className="container-custom py-20">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </Layout>
    );
  }

  // The course exists, render the course detail page
  return (
    <Layout title={`${course.title} - AI Geneuron Courses`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="bg-white rounded-full px-4 py-1 text-sm flex items-center">
                  <svg className="w-4 h-4 text-primary-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>
                  {course.duration}
                </div>
                
                <div className="bg-white rounded-full px-4 py-1 text-sm flex items-center">
                  <svg className="w-4 h-4 text-primary-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  {course.level}
                </div>
                
                <div className="bg-white rounded-full px-4 py-1 text-sm flex items-center">
                  <svg className="w-4 h-4 text-primary-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {course.lessonsCount} lessons
                </div>
                
                <div className="bg-white rounded-full px-4 py-1 text-sm flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {course.rating} ({course.reviewCount} reviews)
                </div>

                {/* Course Reference */}
                <div className="bg-white rounded-full px-4 py-1 text-sm flex items-center">
                  <svg className="w-4 h-4 text-primary-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Ref: {course.ref}
                </div>

                {/* Enrollment Status */}
                {isAuthenticated && isEnrolled && (
                  <div className="bg-green-100 text-green-800 rounded-full px-4 py-1 text-sm flex items-center">
                    <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {enrollmentStatus === 'ACTIVE' ? 'Enrolled' : 
                     enrollmentStatus === 'COMPLETED' ? 'Completed' : 
                     enrollmentStatus === 'PENDING' ? 'Pending' : 'Enrolled'}
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4">
                {!isAuthenticated ? (
                  <Link href="/login" className="btn-primary py-3 px-8">
                    Login to Enroll - {formatPrice(course.price)}
                  </Link>
                ) : isEnrolled ? (
                  <>
                    <Link href="/dashboard" className="btn-primary py-3 px-8">
                      Continue Learning
                    </Link>
                    <Link href={`/courses/${course.id}/module/1`} className="btn-secondary py-3 px-8">
                      Start Course
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleBuy}
                      disabled={enrolling}
                      className="btn-primary py-3 px-8 disabled:opacity-50"
                    >
                      {enrolling ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        `Enroll Now - ${formatPrice(course.price)}`
                      )}
                    </button>
                    <button
                      onClick={handlePurchase}
                      disabled={purchasing}
                      className="btn-secondary py-3 px-8 disabled:opacity-50"
                    >
                      {purchasing ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600 mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        'Buy Now'
                      )}
                    </button>
                  </>
                )}
                <Link href="#curriculum" className="btn-secondary py-3 px-8">
                  View Curriculum
                </Link>
              </div>
            </div>
            
            <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl">
              <Image
                src={course.image}
                alt={course.title}
                fill
                style={{ objectFit: 'cover' }}
                quality={90}
                priority
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Course Details Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: course.fullDescription }} />
              
              <div id="curriculum" className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum.map((module, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-6 py-4">
                        <h3 className="font-bold text-lg flex items-center">
                          <span className="mr-3 text-primary-600 font-mono">
                            Module {index + 1}
                          </span>
                          {module.title}
                        </h3>
                      </div>
                      <div className="bg-white px-6 py-4 flex justify-between items-center">
                        <span className="text-gray-600">{module.lessons} lessons</span>
                        <Link href={`/courses/${course.id}/module/${index + 1}`} className="text-primary-600 hover:text-primary-800 font-medium">
                          Preview
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">Course Instructor</h3>
                  <div className="flex items-center mb-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{course.instructor.name}</h4>
                      <div className="text-sm text-gray-600">Instructor</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{course.instructor.bio}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-xl font-bold mb-4">This Course Includes</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{course.duration} of on-demand video</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Downloadable resources</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <span>Discussion forums</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>Practical exercises</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  {!isAuthenticated ? (
                    <Link href="/login" className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded text-center transition duration-150 ease-in-out">
                      Login to Enroll - {formatPrice(course.price)}
                    </Link>
                  ) : isEnrolled ? (
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div className="text-green-800 font-medium mb-2">
                          {enrollmentStatus === 'ACTIVE' ? '✓ Enrolled' : 
                           enrollmentStatus === 'COMPLETED' ? '✓ Course Completed' : 
                           enrollmentStatus === 'PENDING' ? '⏳ Enrollment Pending' : '✓ Enrolled'}
                        </div>
                        <p className="text-green-600 text-sm">You have access to this course</p>
                      </div>
                      <Link href="/dashboard" className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded text-center transition duration-150 ease-in-out">
                        Continue Learning
                      </Link>
                      <Link href={`/courses/${course.id}/module/1`} className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded text-center transition duration-150 ease-in-out">
                        Start Course
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleBuy}
                      disabled={enrolling}
                      className="block w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold py-3 px-4 rounded text-center transition duration-150 ease-in-out"
                    >
                      {enrolling ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        `Enroll Now - ${formatPrice(course.price)}`
                      )}
                    </button>
                  )}
                  <p className="text-center text-sm text-gray-500 mt-4">30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 