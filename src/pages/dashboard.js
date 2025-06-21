import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { AuthService } from '../services/auth.service';
import { EnrollmentService } from '../services/enrollment.service';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const authService = new AuthService();
  const enrollmentService = new EnrollmentService();

  // Map course refs to course slugs for URL generation
  const courseRefToSlug = {
    'COURSE-6-A0GWYK': 'chatgpt-mastery',
    'COURSE-7-PJKSRN': 'ai-bot-builder',
    'COURSE-8-OBCVJO': 'prompt-engineering',
    'COURSE-9-XYZ123': 'midjourney-mastery',
    'COURSE-10-ABC456': 'ai-business-integration',
    'COURSE-11-DEF789': 'llm-fine-tuning'
  };

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Get user data from localStorage
    const userData = authService.getCurrentUser();
    if (!userData) {
      router.push('/login');
      return;
    }

    setUser(userData);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch user's enrolled courses
      const enrollmentsResponse = await enrollmentService.getAllEnrollmentsByUserInSession();
      if (enrollmentsResponse.success) {
        setEnrolledCourses(enrollmentsResponse.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueLearning = (enrollment) => {
    const courseRef = enrollment.course?.ref;
    const courseSlug = courseRefToSlug[courseRef];
    
    if (courseSlug) {
      // Redirect to module 1 of the course
      router.push(`/courses/${courseSlug}/module/1`);
    } else {
      // Fallback to courses page if course slug not found
      router.push('/courses');
    }
  };

  if (loading) {
    return (
      <Layout title="Dashboard - AI Professionals University">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container-custom">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard - AI Professionals University">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.firstName} {user?.lastName}!
            </h1>
            <p className="text-gray-600 mt-2">
              {user?.email} • {user?.roleTypes}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link 
                href="/courses" 
                className="flex items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-150"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-900">Browse Courses</h3>
                  <p className="text-sm text-primary-700">Explore our available courses</p>
                </div>
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <Link 
                href="/profile" 
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">My Profile</h3>
                  <p className="text-sm text-gray-700">View and edit your profile</p>
                </div>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Enrolled Courses Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Enrolled Courses</h2>
              <Link 
                href="/courses" 
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View All Courses →
              </Link>
            </div>
            
            {enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
                <Link 
                  href="/courses" 
                  className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out"
                >
                  Browse Available Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((enrollment) => (
                  <div key={enrollment.idEnrollment} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {enrollment.course?.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Ref: <span className="font-mono text-xs">{enrollment.course?.ref}</span>
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        Status: <span className="font-medium">{enrollment.enrollmentStatus}</span>
                      </p>
                      <button
                        onClick={() => handleContinueLearning(enrollment)}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out"
                      >
                        Continue Learning →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 