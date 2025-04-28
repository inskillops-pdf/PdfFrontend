import { useState } from 'react';
import Layout from '../../../components/Layout';
import Link from 'next/link';

export default function EnrollChatGPTMastery() {
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  const handleEnroll = (e) => {
    e.preventDefault();
    setIsEnrolled(true);
  };

  return (
    <Layout title="Enroll in ChatGPT Mastery Course">
      <div className="bg-primary-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-2">
              <Link href="/courses" className="hover:text-primary-600">Courses</Link>
              <span>›</span>
              <Link href="/courses/chatgpt-mastery-course" className="hover:text-primary-600">ChatGPT Mastery</Link>
              <span>›</span>
              <span className="text-gray-900">Enrollment</span>
            </div>
            
            <h1 className="text-3xl font-bold">Enroll in ChatGPT Mastery Course</h1>
          </div>
        </div>
      </div>
      
      <div className="py-12 bg-white">
        <div className="container-custom max-w-3xl">
          {!isEnrolled ? (
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Enrollment</h2>
              
              <div className="mb-8">
                <div className="bg-primary-50 p-4 rounded-lg mb-4">
                  <h3 className="font-bold text-lg mb-2">Course: ChatGPT Mastery</h3>
                  <p className="text-gray-600 mb-2">8 modules • 40 lessons • Lifetime access</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-2xl">$199.00</span>
                    <span className="text-green-600 font-medium">30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleEnroll}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      defaultValue="Test"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      defaultValue="User"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    defaultValue="test@example.com"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">You'll use this to log in and receive course updates</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-bold mb-3">Payment Method</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <input type="radio" id="creditCard" name="paymentMethod" className="h-4 w-4 text-primary-600" defaultChecked />
                      <label htmlFor="creditCard" className="ml-2">Credit Card (Test Mode)</label>
                    </div>
                    
                    <div className="pl-6">
                      <div className="mb-3">
                        <label htmlFor="cardNumber" className="block text-gray-700 text-sm mb-1">Card Number</label>
                        <input 
                          type="text" 
                          id="cardNumber" 
                          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          defaultValue="4242 4242 4242 4242"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="expiry" className="block text-gray-700 text-sm mb-1">Expiry Date</label>
                          <input 
                            type="text" 
                            id="expiry" 
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            defaultValue="12/25"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-gray-700 text-sm mb-1">CVC</label>
                          <input 
                            type="text" 
                            id="cvc" 
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            defaultValue="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-start">
                    <input type="checkbox" id="terms" className="h-4 w-4 mt-1 text-primary-600" required />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                </div>
                
                <button type="submit" className="btn-primary w-full py-3 text-lg font-medium">
                  Enroll Now - $199.00
                </button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  By enrolling, you're agreeing to our terms and conditions. This is a test mode - no actual payment will be processed.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Enrollment Successful!</h2>
              <p className="text-gray-600 mb-6">
                You're now enrolled in the ChatGPT Mastery course. You can start learning right away.
              </p>
              <div className="space-y-4">
                <Link href="/courses/chatgpt-mastery/module-1" className="btn-primary block w-full py-3">
                  Start Learning
                </Link>
                <Link href="/courseaccess" className="btn-secondary block w-full py-3">
                  Return to Course Access Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 