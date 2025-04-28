import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { auth, db } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [userCourses, setUserCourses] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  
  // Dummy courses data (in a real app, this would come from the database)
  const courses = [
    {
      id: 'chatgpt-mastery',
      title: 'ChatGPT Mastery',
      description: 'Learn how to leverage ChatGPT for business applications and content creation.',
      image: '/images/course-1.jpg',
      progress: 65,
      lessonsCompleted: 98,
      totalLessons: 152
    },
    {
      id: 'ai-bot-builder',
      title: 'AI Bot Builder',
      description: 'Create custom AI bots for customer service, sales, and lead generation.',
      image: '/images/course-2.jpg',
      progress: 30,
      lessonsCompleted: 29,
      totalLessons: 97
    },
    {
      id: 'prompt-engineering',
      title: 'Advanced Prompt Engineering',
      description: 'Master the art of crafting effective prompts for any AI model.',
      image: '/images/course-3.jpg',
      progress: 10,
      lessonsCompleted: 5,
      totalLessons: 48
    }
  ];
  
  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!loading && !user) {
      router.push('/login?redirect=/dashboard');
      return;
    }
    
    // Fetch user data
    if (user) {
      const fetchUserData = async () => {
        try {
          // In a real app, you would fetch the user's courses from Firestore
          // For demo purposes, we'll use the dummy data
          setUserCourses(courses);
          setUserProfile({
            name: user.displayName || 'AI Student',
            email: user.email,
            photoURL: user.photoURL || '/images/default-avatar.png',
            joinDate: new Date().toLocaleDateString(),
            membershipType: 'Pro'
          });
          
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      
      fetchUserData();
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
      <Layout title="Loading Dashboard - AI Professionals University">
        <div className="container-custom py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard - AI Professionals University">
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          {/* Welcome header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                {userProfile?.photoURL && (
                  <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-primary-500">
                    <Image
                      src={userProfile.photoURL}
                      alt={userProfile.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl font-bold">Welcome, {userProfile?.name}!</h1>
                  <p className="text-gray-600">
                    {userProfile?.membershipType} Member · Joined {userProfile?.joinDate}
                  </p>
                </div>
              </div>
              <div>
                <Link href="/settings" className="btn-secondary">
                  Account Settings
                </Link>
              </div>
            </div>
          </div>
          
          {/* Progress summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Courses Enrolled</h3>
                  <span className="text-2xl font-bold text-primary-600">{userCourses.length}</span>
                </div>
                <p className="text-sm text-gray-600">Keep going! You're making great progress.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Lessons Completed</h3>
                  <span className="text-2xl font-bold text-primary-600">
                    {userCourses.reduce((total, course) => total + course.lessonsCompleted, 0)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Out of {userCourses.reduce((total, course) => total + course.totalLessons, 0)} total lessons</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Overall Completion</h3>
                  <span className="text-2xl font-bold text-primary-600">
                    {Math.round(
                      (userCourses.reduce((total, course) => total + course.lessonsCompleted, 0) /
                        userCourses.reduce((total, course) => total + course.totalLessons, 0)) *
                        100
                    )}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${Math.round(
                        (userCourses.reduce((total, course) => total + course.lessonsCompleted, 0) /
                          userCourses.reduce((total, course) => total + course.totalLessons, 0)) *
                          100
                      )}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* My Courses */}
          <h2 className="text-2xl font-bold mb-6">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress: {course.progress}%</span>
                      <span className="text-sm font-medium text-gray-700">
                        {course.lessonsCompleted}/{course.totalLessons} lessons
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/courses/${course.id}`} 
                    className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Recommended Courses */}
          <h2 className="text-2xl font-bold mt-12 mb-6">Recommended for You</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                <div className="relative h-20 w-20 md:h-32 md:w-32">
                  <Image
                    src="/images/recommended-course.jpg"
                    alt="AI for Business Strategy"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">AI for Business Strategy</h3>
                <p className="text-gray-600 mb-4">
                  Learn how to develop comprehensive AI strategies for your business or clients. 
                  Perfect next step after completing the ChatGPT Mastery course.
                </p>
                <Link 
                  href="/courses/ai-business-strategy" 
                  className="inline-block bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Course
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 