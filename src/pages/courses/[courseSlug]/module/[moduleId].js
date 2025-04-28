import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '../../../../components/Layout';
import { loadModuleLessons, getModuleData } from '../../../../lib/markdown';

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
    if (typeof window !== 'undefined' && !isLoaded) {
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
  }, [courseSlug, moduleId, isLoaded]);
  
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
      {isLoaded && (
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