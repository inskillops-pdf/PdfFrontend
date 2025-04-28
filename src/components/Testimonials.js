import { useState } from 'react';
import Image from 'next/image';

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "Digital Spark",
      quote: "The AI Professional University program completely transformed how I approach marketing campaigns. In just 7 days, I learned how to automate content creation and personalize customer journeys with ChatGPT. Our engagement rates increased by 78% in the first month after implementing these strategies!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      company: "InnovateTech",
      quote: "As a solo founder, I was stretched thin trying to handle all aspects of my business. The ChatGPT certification course taught me how to build AI assistants that now handle customer support, content creation, and even help with coding. It's like having a full team at my disposal for a fraction of the cost.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Jennifer Williams",
      role: "E-commerce Consultant",
      company: "Growth Partners",
      quote: "I've taken many AI courses before, but none delivered practical results like this one. The bite-sized lessons were easy to follow, and the bot templates saved me countless hours. My clients are amazed by the custom AI solutions I can now offer them. This certification has become my secret weapon!",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their careers with our AI training.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow">
                  <Image
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              
              <div>
                <svg className="w-12 h-12 text-primary-200 mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
                </svg>
                
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6">
                  {testimonials[activeTestimonial].quote}
                </blockquote>
                
                <div>
                  <h4 className="text-xl font-bold">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-gray-600">
                    {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={prevTestimonial}
              className="mr-4 bg-white rounded-full p-2 shadow hover:bg-gray-100"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === activeTestimonial ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 