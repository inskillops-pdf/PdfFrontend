import Link from 'next/link';
import Image from 'next/image';

export default function PricingPlans() {
  const allCourses = [
    {
      id: 'chatgpt-mastery',
      ref: 'COURSE-6-A0GWYK',
      title: 'ChatGPT Mastery',
      description: 'Learn how to leverage ChatGPT for business applications and content creation.',
      image: 'https://images.unsplash.com/photo-1678995632928-298d05d41671',
      price: 199,
    },
    {
      id: 'ai-bot-builder',
      ref: 'COURSE-7-PJKSRN',
      title: 'AI Bot Builder',
      description: 'Create custom AI bots for customer service, sales, and lead generation.',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008',
      price: 249,
    },
    {
      id: 'prompt-engineering',
      ref: 'COURSE-8-OBCVJO',
      title: 'Advanced Prompt Engineering',
      description: 'Master the art of crafting effective prompts for any AI model.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
      price: 149,
    },
    {
      id: 'midjourney-mastery',
      ref: 'MIDJOURNEY-MASTERY-001',
      title: 'Midjourney Mastery',
      description: 'Create stunning AI-generated artwork and imagery with Midjourney.',
      image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c',
      price: 179,
    },
    {
      id: 'ai-business-integration',
      ref: 'AI-BUSINESS-INTEGRATION-001',
      title: 'AI Business Integration',
      description: 'Implement AI solutions in your business operations to drive growth.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
      price: 299,
    },
    {
      id: 'llm-fine-tuning',
      ref: 'LLM-FINE-TUNING-001',
      title: 'LLM Fine-Tuning & Training',
      description: 'Learn to train and fine-tune large language models for specific applications.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
      price: 349,
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div id="courses" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Courses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect course to start your AI journey or advance your skills. Each course can be purchased individually.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCourses.map((course) => (
            <div 
              key={course.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
                
                <div className="my-4">
                  <span className="text-3xl font-bold text-gray-900">{formatPrice(course.price)}</span>
                </div>
                
                <Link 
                  href={`/courses/${course.id}`}
                  className="block text-center w-full py-3 px-4 rounded-lg font-semibold mt-auto bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200"
                >
                  View Course Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/courses" className="text-primary-600 font-medium hover:text-primary-700">
            View all courses →
          </Link>
        </div>
      </div>
    </div>
  );
} 