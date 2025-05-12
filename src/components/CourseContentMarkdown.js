import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import MarkdownContent from './MarkdownContent';

const CourseContentMarkdown = ({ 
  moduleData,
  lessons, 
  courseSlug = 'chatgpt-mastery',
  initialLessonId = 1
}) => {
  // Utiliser useRef pour le suivi des changements sans provoquer de rendu
  const activeRef = useRef(initialLessonId);
  const contentRef = useRef(null);
  
  // État local synchronisé avec activeRef
  const [activeLesson, setActiveLesson] = useState(initialLessonId);
  
  // Trouver la leçon actuelle une seule fois
  const currentLesson = lessons.find(lesson => lesson.id === activeLesson) || lessons[0];
  
  // Fonction memoizée pour mettre à jour l'état
  const updateLesson = useCallback((lessonId) => {
    const id = Number(lessonId);
    if (id !== activeRef.current && id >= 1 && id <= lessons.length) {
      activeRef.current = id;
      setActiveLesson(id);
    }
  }, [lessons.length]);
  
  // Sauvegarde/restauration de sessionStorage avec useEffect stable
  useEffect(() => {
    // Ne s'exécuter qu'une fois au montage pour restaurer
    if (typeof window !== 'undefined') {
      try {
        const storageKey = `${courseSlug}-module-${moduleData.id}-lesson`;
        const savedLesson = sessionStorage.getItem(storageKey);
        
        if (savedLesson && parseInt(savedLesson) !== activeRef.current) {
          updateLesson(parseInt(savedLesson));
        }
        
        // S'exécute lors du démontage ou lorsque activeLesson change
        return () => {
          try {
            sessionStorage.setItem(storageKey, activeRef.current.toString());
          } catch (e) {
            console.warn('Failed to save lesson to sessionStorage', e);
          }
        };
      } catch (e) {
        console.warn('Error accessing sessionStorage', e);
      }
    }
  }, [courseSlug, moduleData.id, updateLesson]);
  
  // Sauvegarder lors des changements mais sans créer de dépendance
  useEffect(() => {
    activeRef.current = activeLesson;
    
    // Sauvegarder dans sessionStorage sans dépendre de courseSlug ou moduleData
    if (typeof window !== 'undefined') {
      try {
        const storageKey = `${courseSlug}-module-${moduleData.id}-lesson`;
        sessionStorage.setItem(storageKey, activeLesson.toString());
      } catch (e) {
        console.warn('Failed to save lesson to sessionStorage', e);
      }
    }
  }, [activeLesson, courseSlug, moduleData.id]);
  
  // Navigation vers la leçon précédente/suivante avec memoization
  const goToPreviousLesson = useCallback(() => {
    if (activeRef.current > 1) {
      updateLesson(activeRef.current - 1);
      scrollToTop();
    }
  }, [updateLesson]);
  
  const goToNextLesson = useCallback(() => {
    if (activeRef.current < lessons.length) {
      updateLesson(activeRef.current + 1);
      scrollToTop();
    }
  }, [lessons.length, updateLesson]);
  
  // Fonction de scroll contrôlé
  const scrollToTop = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
  
  // Handler pour le clic sur une leçon
  const handleLessonClick = useCallback((lessonId) => {
    updateLesson(lessonId);
    scrollToTop();
  }, [updateLesson, scrollToTop]);

  return (
    <>
      <div className="bg-gray-100 py-8 border-b border-gray-200" ref={contentRef}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap items-center text-sm text-gray-600 gap-2">
              <Link href="/courses" className="hover:text-blue-600">Courses</Link>
              <span>›</span>
              <Link href={`/courses/${courseSlug}`} className="hover:text-blue-600">{moduleData.courseTitle || 'Course'}</Link>
              <span>›</span>
              <span className="text-gray-900">Module {moduleData.id}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900">Module {moduleData.id}: {moduleData.title}</h1>
            <p className="text-xl text-gray-600">{moduleData.description}</p>
          </div>
        </div>
      </div>
      
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Style GitHub */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-white rounded-md border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Module Contents</h3>
                </div>
                
                <nav className="py-2">
                  {lessons.map((lesson) => (
                    <button 
                      key={lesson.id}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        activeLesson === lesson.id 
                          ? 'bg-blue-50 border-l-4 border-blue-500' 
                          : 'border-l-4 border-transparent'
                      }`}
                      onClick={() => handleLessonClick(lesson.id)}
                    >
                      <div className="flex items-center">
                        <span className={`mr-2 font-mono text-xs ${
                          activeLesson === lesson.id 
                            ? 'text-blue-700' 
                            : 'text-gray-500'
                        }`}>
                          {lesson.id}.
                        </span>
                        <span className={`${
                          activeLesson === lesson.id 
                            ? 'font-medium text-blue-700' 
                            : 'text-gray-700'
                        }`}>
                          {lesson.title}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 ml-5 mt-1">
                        {lesson.duration}
                      </div>
                    </button>
                  ))}
                </nav>
                
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between">
                    <Link 
                      href={`/courses/${courseSlug}`}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      prefetch={false}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Course Home
                    </Link>
                    
                    {moduleData.nextModuleId && (
                      <Link 
                        href={`/courses/${courseSlug}/module/${moduleData.nextModuleId}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        prefetch={false}
                      >
                        Next Module
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
                {/* Lesson Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {currentLesson.title}
                      </h2>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {currentLesson.duration} reading time
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100"
                        aria-label="Bookmark this lesson"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Lesson Content */}
                <div className="px-6 py-6">
                  <MarkdownContent content={currentLesson.content} />
                </div>
                
                {/* Lesson Navigation */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <div className="flex-1">
                    {activeLesson > 1 ? (
                      <button 
                        onClick={goToPreviousLesson}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        title={`Previous: ${lessons[activeLesson - 2]?.title || 'Previous Lesson'}`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-500 hidden sm:block">
                    Lesson {activeLesson} of {lessons.length}
                  </div>
                  
                  <div className="flex-1 text-right">
                    {activeLesson < lessons.length && (
                      <button 
                        onClick={goToNextLesson}
                        className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                        title={`Next: ${lessons[activeLesson]?.title || 'Next Lesson'}`}
                      >
                        Next
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Discussion Area (optionnel) */}
              <div className="mt-8 bg-white rounded-md border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    Discussion
                  </h3>
                </div>
                
                <div className="px-6 py-4">
                  <div className="text-center py-8">
                    <p className="text-gray-500">Questions about this lesson? Join the discussion.</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Start Discussion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CourseContentMarkdown); 