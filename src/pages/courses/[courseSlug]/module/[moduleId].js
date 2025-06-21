import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '../../../../components/Layout';
import { loadModuleLessons, getModuleData } from '../../../../lib/markdown';
import { AuthService } from '../../../../services/auth.service';
import { EnrollmentService } from '../../../../services/enrollment.service';

// Import dynamique du composant CourseContentMarkdown pour éviter les problèmes de SSR
const CourseContentMarkdown = dynamic(
  () => import('../../../../components/CourseContentMarkdown'),
  { 
    ssr: true,
    loading: () => (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-pulse bg-gray-200 h-8 w-64 mx-auto mb-4 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-4 max-w-md mx-auto rounded"></div>
      </div>
    )
  }
);

export async function getStaticPaths() {
  // Générer les chemins pour différents cours et modules
  const paths = [];
  
  // Pour le cours ChatGPT Mastery, modules 1-8
  for (let moduleId = 1; moduleId <= 8; moduleId++) {
    paths.push({
      params: { courseSlug: 'chatgpt-mastery', moduleId: moduleId.toString() }
    });
  }
  
  // Pour le cours AI Bot Builder, modules 1-5
  for (let moduleId = 1; moduleId <= 5; moduleId++) {
    paths.push({
      params: { courseSlug: 'ai-bot-builder', moduleId: moduleId.toString() }
    });
  }
  
  // Pour le cours Prompt Engineering, modules 1-5
  for (let moduleId = 1; moduleId <= 5; moduleId++) {
    paths.push({
      params: { courseSlug: 'prompt-engineering', moduleId: moduleId.toString() }
    });
  }
  
  // Pour le cours Midjourney, modules 1-5
  for (let moduleId = 1; moduleId <= 5; moduleId++) {
    paths.push({
      params: { courseSlug: 'midjourney-mastery', moduleId: moduleId.toString() }
    });
  }
  
  return {
    paths,
    fallback: 'blocking' // Permet le chargement des autres cours/modules à la demande
  };
}

export async function getStaticProps({ params }) {
  const { courseSlug, moduleId } = params;
  
  // Liste des cours valides
  const validCourses = ['chatgpt-mastery', 'ai-bot-builder', 'prompt-engineering', 'midjourney-mastery'];
  
  // Vérifier si le cours existe
  if (!validCourses.includes(courseSlug) || !moduleId) {
    return {
      notFound: true
    };
  }
  
  try {
    // Charger les données du module pour le cours spécifié
    const moduleData = getModuleData(parseInt(moduleId), courseSlug);
    
    // Charger les leçons du module depuis les fichiers markdown
    const lessons = await loadModuleLessons(parseInt(moduleId), courseSlug);
    
    return {
      props: {
        courseSlug,
        moduleData,
        lessons,
        moduleId: parseInt(moduleId)
      },
      // Réduire la revalidation pour éviter les rechargements fréquents
      revalidate: 3600 // 1 heure
    };
  } catch (error) {
    console.error('Error loading module data:', error);
    return {
      notFound: true
    };
  }
}

function CourseModule({ courseSlug, moduleData, lessons, moduleId }) {
  const router = useRouter();
  const [initialLessonId, setInitialLessonId] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [enrollmentError, setEnrollmentError] = useState(null);
  
  const authService = new AuthService();
  const enrollmentService = new EnrollmentService();

  // Map course slugs to course refs for enrollment checking
  const courseSlugToRef = {
    'chatgpt-mastery': 'COURSE-6-A0GWYK',
    'ai-bot-builder': 'COURSE-7-PJKSRN',
    'prompt-engineering': 'COURSE-8-OBCVJO',
    'midjourney-mastery': 'COURSE-9-XYZ123',
    'ai-business-integration': 'COURSE-10-ABC456',
    'llm-fine-tuning': 'COURSE-11-DEF789'
  };

  // Check enrollment status
  useEffect(() => {
    const checkEnrollment = async () => {
      // Check if user is authenticated
      if (!authService.isAuthenticated()) {
        router.push('/login');
        return;
      }

      try {
        setCheckingEnrollment(true);
        const courseRef = courseSlugToRef[courseSlug];
        
        if (!courseRef) {
          setEnrollmentError('Course not found');
          setCheckingEnrollment(false);
          return;
        }

        // Get user enrollments
        const response = await enrollmentService.getAllEnrollmentsByUserInSession();
        if (response.success && response.data) {
          const userEnrollment = response.data.find(enrollment => 
            enrollment.course?.ref === courseRef
          );
          
          if (userEnrollment) {
            setIsEnrolled(true);
          } else {
            setEnrollmentError('You are not enrolled in this course');
          }
        } else {
          setEnrollmentError('Failed to check enrollment status');
        }
      } catch (error) {
        console.error('Error checking enrollment:', error);
        setEnrollmentError('Failed to verify course access');
      } finally {
        setCheckingEnrollment(false);
      }
    };

    checkEnrollment();
  }, [courseSlug, router]);
  
  // Désactiver le rechargement complet de la page lors des changements de route
  useEffect(() => {
    const handleRouteChange = (url) => {
      // Ne rien faire, juste laisser l'événement se propager
      // Cela évite que Next.js ne fasse un rechargement complet
    };
    
    router.events.on('routeChangeStart', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);
  
  // Effet pour récupérer la leçon sauvegardée lors du montage du composant
  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoaded && isEnrolled) {
      try {
        const storageKey = `${courseSlug}-module-${moduleId}-lesson`;
        const savedLesson = sessionStorage.getItem(storageKey);
        
        if (savedLesson) {
          setInitialLessonId(parseInt(savedLesson));
        }
        
        setIsLoaded(true);
      } catch (e) {
        console.warn('Error accessing sessionStorage', e);
        setIsLoaded(true);
      }
    }
  }, [courseSlug, moduleId, isLoaded, isEnrolled]);
  
  // Mémoriser le titre de la page
  const pageTitle = useMemo(() => {
    const courseNames = {
      'chatgpt-mastery': 'ChatGPT Mastery',
      'ai-bot-builder': 'AI Bot Builder',
      'prompt-engineering': 'Advanced Prompt Engineering',
      'midjourney-mastery': 'Midjourney Image Generation Mastery'
    };
    
    return `Module ${moduleData.id}: ${moduleData.title} | ${courseNames[courseSlug] || moduleData.courseTitle}`;
  }, [courseSlug, moduleData]);
  
  // Show loading while checking enrollment
  if (checkingEnrollment) {
    return (
      <Layout title="Verifying Access...">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-4">Verifying Course Access...</h1>
          <p className="text-gray-600">Please wait while we verify your enrollment.</p>
        </div>
      </Layout>
    );
  }

  // Show error if not enrolled
  if (enrollmentError) {
    return (
      <Layout title="Access Denied">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h1 className="text-2xl font-bold text-red-800 mb-4">Access Denied</h1>
            <p className="text-red-600 mb-6">{enrollmentError}</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/courses')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Browse Courses
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Afficher un état de chargement si les données sont en cours de récupération
  if (router.isFallback) {
    return (
      <Layout title="Chargement...">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Chargement du contenu...</h1>
          <p>Veuillez patienter pendant que nous préparons le contenu du cours.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={pageTitle}>
      {isLoaded && isEnrolled && (
        <CourseContentMarkdown 
          moduleData={moduleData}
          lessons={lessons}
          courseSlug={courseSlug}
          initialLessonId={initialLessonId}
          key={`${courseSlug}-${moduleId}`} // Clé stable pour éviter les remontages
        />
      )}
    </Layout>
  );
}

// Optimiser le composant avec React.memo
export default CourseModule; 