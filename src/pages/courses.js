import { useState } from 'react';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';

export default function Courses() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Course data (in a real app, this would come from an API or database)
  const allCourses = [
    {
      id: 'chatgpt-mastery',
      title: 'ChatGPT Mastery',
      description: 'Learn how to leverage ChatGPT for business applications and content creation. Master prompt engineering and get the most out of AI language models.',
      image: 'https://images.unsplash.com/photo-1678995632928-298d05d41671',
      level: 'Beginner',
      duration: '12 hours',
      lessonsCount: 152,
      price: 199,
      rating: 4.8,
      reviewCount: 429,
      category: 'ai-tools'
    },
    {
      id: 'ai-bot-builder',
      title: 'AI Bot Builder',
      description: 'Create custom AI bots for customer service, sales, and lead generation. Learn practical bot development with real-world applications.',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008',
      level: 'Intermediate',
      duration: '18 hours',
      lessonsCount: 97,
      price: 249,
      rating: 4.6,
      reviewCount: 312,
      category: 'development'
    },
    {
      id: 'prompt-engineering',
      title: 'Advanced Prompt Engineering',
      description: 'Master the art of crafting effective prompts for any AI model. Unlock the full potential of AI through strategic and creative prompting.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
      level: 'Advanced',
      duration: '8 hours',
      lessonsCount: 48,
      price: 149,
      rating: 4.9,
      reviewCount: 271,
      category: 'ai-tools'
    },
    {
      id: 'midjourney-mastery',
      title: 'Midjourney Image Generation Mastery',
      description: 'Create stunning AI-generated artwork and imagery with Midjourney. Learn advanced techniques for creating commercial-quality visuals.',
      image: 'https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c',
      level: 'Beginner',
      duration: '10 hours',
      lessonsCount: 72,
      price: 179,
      rating: 4.7,
      reviewCount: 183,
      category: 'ai-tools'
    },
    {
      id: 'ai-business-integration',
      title: 'AI Business Integration',
      description: 'Implement AI solutions in your business operations. Increase efficiency, reduce costs, and drive innovation with practical AI implementations.',
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
      level: 'Intermediate',
      duration: '15 hours',
      lessonsCount: 88,
      price: 299,
      rating: 4.5,
      reviewCount: 156,
      category: 'business'
    },
    {
      id: 'llm-fine-tuning',
      title: 'LLM Fine-Tuning & Training',
      description: 'Learn to train and fine-tune large language models for specific business applications. Create custom AI models tailored to your needs.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
      level: 'Advanced',
      duration: '20 hours',
      lessonsCount: 115,
      price: 349,
      rating: 4.8,
      reviewCount: 97,
      category: 'development'
    }
  ];

  // Filter and search functionality
  const filteredCourses = allCourses.filter(course => {
    const matchesFilter = filter === 'all' || course.category === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'ai-tools', name: 'AI Tools' },
    { id: 'development', name: 'Development' },
    { id: 'business', name: 'Business' }
  ];

  return (
    <Layout title="Courses - AI Geneuron Courses">
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our AI Courses</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge training to help you master AI technology and advance your career in the fastest-growing field in tech.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-2/3">
                <label htmlFor="search" className="sr-only">Search courses</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search for courses..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <label htmlFor="category" className="sr-only">Filter by category</label>
                <select
                  id="category"
                  name="category"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700">No courses found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-100 py-16">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Take Your AI Skills to the Next Level?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of successful students who have transformed their careers with our comprehensive AI training programs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/pricing" className="btn-primary text-lg py-3 px-8">
                View Pricing Plans
              </a>
              <a href="/contact" className="btn-secondary text-lg py-3 px-8">
                Ask a Question
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 