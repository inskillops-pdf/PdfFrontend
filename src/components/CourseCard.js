import Link from 'next/link';
import Image from 'next/image';

export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48">
        <Image
          src={course.image}
          alt={course.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
          <span className="bg-secondary-100 text-secondary-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {course.level}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex items-center mb-4">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <p className="ml-2 text-sm font-bold text-gray-700">{course.rating}</p>
          <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-400"></span>
          <p className="text-sm font-medium text-gray-500">{course.reviewCount} reviews</p>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className="text-sm text-gray-500">{course.duration}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
            </svg>
            <span className="text-sm text-gray-500">{course.lessonsCount} lessons</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">${course.price}</span>
          <Link href={`/courses/${course.id}`} className="btn-primary">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
} 