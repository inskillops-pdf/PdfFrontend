import Layout from '../components/Layout';
import PricingPlans from '../components/PricingPlans';
import FAQ from '../components/FAQ';

export default function Pricing() {
  return (
    <Layout title="Pricing - AI Professionals University">
      <div className="bg-gray-50 py-12">
        <div className="container-custom text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment in Your AI Future</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that best suits your needs and start mastering AI today. All plans include access to our core AI training materials.
          </p>
        </div>
      </div>
      
      <PricingPlans />
      
      <div className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">100% Satisfaction Guarantee</h2>
              <p className="text-lg text-gray-600 mb-4">
                We're confident you'll love our AI courses and see immediate results. But if you're not completely satisfied, we offer a hassle-free 30-day money-back guarantee.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Try AI Professionals University risk-free and see the difference our training can make in your career or business.
              </p>
              <div className="flex items-center text-primary-600">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span className="font-medium">30-Day Money-Back Guarantee</span>
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">What Our Students Say</h3>
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="text-yellow-400 flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">2 weeks ago</span>
                  </div>
                  <p className="text-gray-700">
                    "The Pro plan was definitely worth the investment. The bot templates alone saved me countless hours of work."
                  </p>
                  <p className="mt-2 font-semibold">— Alex T., Marketing Consultant</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <div className="text-yellow-400 flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">1 month ago</span>
                  </div>
                  <p className="text-gray-700">
                    "I was hesitant at first, but the 30-day guarantee convinced me to try it. I ended up keeping it because the course is amazing!"
                  </p>
                  <p className="mt-2 font-semibold">— Sarah M., Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FAQ />
    </Layout>
  );
} 