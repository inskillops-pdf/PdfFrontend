import { useState } from 'react';
import Link from 'next/link';

export default function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const pricingPlans = [
    {
      name: 'Basic',
      description: 'Perfect for beginners looking to start their AI journey',
      monthlyPrice: 49,
      annualPrice: 470,
      features: [
        'Access to AI Fundamentals Course',
        'Basic ChatGPT Prompting',
        '30+ Beginner AI Templates',
        'Community Access',
        'Email Support'
      ],
      buttonText: 'Get Started',
      buttonLink: '/signup?plan=basic',
      highlighted: false
    },
    {
      name: 'Pro',
      description: 'For professionals seeking advanced AI mastery',
      monthlyPrice: 99,
      annualPrice: 950,
      features: [
        'All Basic Features',
        'Full Access to All Courses',
        '99 AI Bots Library',
        'Bot Builder Training',
        '17 Custom Chatbots',
        'Priority Support',
        'Monthly Webinars'
      ],
      buttonText: 'Get Pro Access',
      buttonLink: '/signup?plan=pro',
      highlighted: true
    },
    {
      name: 'Enterprise',
      description: 'For teams and businesses scaling AI solutions',
      monthlyPrice: 199,
      annualPrice: 1900,
      features: [
        'All Pro Features',
        'Team Access (5 Members)',
        'Custom AI Consulting',
        'White-Label Rights',
        'API Access',
        '1-on-1 Coaching Sessions',
        'Dedicated Account Manager'
      ],
      buttonText: 'Contact Sales',
      buttonLink: '/contact',
      highlighted: false
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that best fits your needs. All plans include access to our core AI training.
          </p>
          
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-1 rounded-lg shadow-sm">
              <div className="flex">
                <button
                  className={`py-2 px-4 rounded-lg ${!isAnnual ? 'bg-primary-100 text-primary-800' : 'text-gray-600'}`}
                  onClick={() => setIsAnnual(false)}
                >
                  Monthly
                </button>
                <button
                  className={`py-2 px-4 rounded-lg ${isAnnual ? 'bg-primary-100 text-primary-800' : 'text-gray-600'}`}
                  onClick={() => setIsAnnual(true)}
                >
                  Annually <span className="text-xs font-semibold text-primary-600">(Save 20%)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${plan.highlighted ? 'border-2 border-primary-500 transform md:-translate-y-4' : ''}`}
            >
              {plan.highlighted && (
                <div className="bg-primary-500 text-white text-center py-2 font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">${isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                  <span className="text-gray-500">/{isAnnual ? 'year' : 'month'}</span>
                </div>
                
                <Link 
                  href={plan.buttonLink}
                  className={`block text-center py-3 px-4 rounded font-semibold mb-8 ${
                    plan.highlighted
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {plan.buttonText}
                </Link>
                
                <div className="border-t border-gray-200 pt-6">
                  <p className="font-medium mb-4">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need a custom solution for your business?</p>
          <Link href="/contact" className="text-primary-600 font-medium hover:text-primary-700">
            Contact our sales team →
          </Link>
        </div>
      </div>
    </div>
  );
} 