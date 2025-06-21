import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { CourseService } from '../../services/course.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [purchasingCourse, setPurchasingCourse] = useState(null);
  
  const router = useRouter();
  const courseService = new CourseService();
  const paymentService = new PaymentService();
  const authService = new AuthService();

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await courseService.getAllCourses();
      if (response.success) {
        setCourses(response.data);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again later.');
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

  const handlePurchaseCourse = async (course) => {
    try {
      setPurchasingCourse(course.idCourse);
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

      // Call checkout endpoint
      const response = await paymentService.checkoutCourse(paymentRequest, course.idCourse);
      
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
      setPurchasingCourse(null);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Layout title="Courses - AI Professionals University">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container-custom">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Courses - AI Professionals University">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Courses</h1>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-gray-600">
                Discover our comprehensive selection of professional AI courses
              </p>
              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.idCourse} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {course.ref}
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(course.price)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/courses/${course.idCourse}`)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handlePurchaseCourse(course)}
                        disabled={purchasingCourse === course.idCourse}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out"
                      >
                        {purchasingCourse === course.idCourse ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </div>
                        ) : (
                          'Buy Now'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No courses found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 