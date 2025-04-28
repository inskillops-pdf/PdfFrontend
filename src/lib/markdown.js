import fs from 'fs';
import path from 'path';

/**
 * Charge les leçons d'un module spécifique depuis les fichiers markdown
 * @param {number} moduleId - L'ID du module à charger
 * @param {object} lessonMetadata - Métadonnées des leçons (titre, durée, etc.)
 * @param {string} courseSlug - Le slug du cours
 * @returns {Array} Un tableau de leçons avec leur contenu markdown
 */
export async function loadModuleLessons(moduleId, courseSlug = 'chatgpt-mastery', lessonMetadata = null) {
  const contentDirectory = path.join(process.cwd(), 'src/content');
  const lessons = [];

  try {
    // Si aucune métadonnée n'est fournie, nous utilisons des métadonnées par défaut
    const metadata = lessonMetadata || getDefaultLessonMetadata(moduleId, courseSlug);
    
    // Pour chaque leçon, essayer de charger le contenu markdown
    for (const lesson of metadata) {
      const filePath = path.join(contentDirectory, `${courseSlug}-module-${moduleId}-lesson-${lesson.id}.md`);
      const legacyFilePath = path.join(contentDirectory, `module-${moduleId}-lesson-${lesson.id}.md`); // Pour la compatibilité
      
      let content;
      try {
        // D'abord essayer avec le nouveau format de nom de fichier
        if (fs.existsSync(filePath)) {
          content = fs.readFileSync(filePath, 'utf8');
        } 
        // Sinon, essayer avec l'ancien format (pour la compatibilité avec le cours ChatGPT)
        else if (courseSlug === 'chatgpt-mastery' && fs.existsSync(legacyFilePath)) {
          content = fs.readFileSync(legacyFilePath, 'utf8');
        } 
        // Si le fichier n'existe pas, utiliser un contenu par défaut
        else {
          content = `# ${lesson.title}\n\nContenu en cours de création.`;
        }
      } catch (error) {
        // Si le fichier n'existe pas, utiliser un contenu par défaut
        content = `# ${lesson.title}\n\nContenu en cours de création.`;
      }
      
      lessons.push({
        ...lesson,
        content
      });
    }
    
    return lessons;
  } catch (error) {
    console.error('Error loading markdown content:', error);
    return [];
  }
}

/**
 * Charge les données d'un module spécifique
 * @param {number} moduleId - L'ID du module à charger
 * @param {string} courseSlug - Le slug du cours
 * @returns {object} Les données du module
 */
export function getModuleData(moduleId, courseSlug = 'chatgpt-mastery') {
  // Modules du cours ChatGPT Mastery
  const chatgptModules = [
    {
      id: 1,
      title: 'Getting Started with ChatGPT',
      description: 'Introduction to AI concepts and the ChatGPT ecosystem',
      courseTitle: 'ChatGPT Mastery',
      nextModuleId: 2
    },
    {
      id: 2,
      title: 'Prompt Engineering Fundamentals',
      description: 'Learn the core techniques for crafting effective prompts',
      courseTitle: 'ChatGPT Mastery',
      nextModuleId: 3
    },
    {
      id: 3,
      title: 'Advanced Prompting Strategies',
      description: 'Master sophisticated techniques for specialized outputs',
      courseTitle: 'ChatGPT Mastery',
      nextModuleId: 4
    },
    {
      id: 4,
      title: 'Content Creation with ChatGPT',
      description: 'Transform your writing and creative processes',
      courseTitle: 'ChatGPT Mastery',
      nextModuleId: 5
    },
    {
      id: 5,
      title: 'Business Applications',
      description: 'Implement ChatGPT in your business operations',
      courseTitle: 'ChatGPT Mastery',
      nextModuleId: 6
    },
    {
      id: 6,
      title: 'ChatGPT for Developers',
      description: 'Technical applications for programmers and web developers',
      courseTitle: 'ChatGPT Mastery',
      nextModuleId: 7
    },
    {
      id: 7,
      title: 'ChatGPT Bot Building',
      description: 'Create custom AI assistants for specific tasks',
      courseTitle: 'ChatGPT Mastery',
      nextModuleId: 8
    },
    {
      id: 8,
      title: 'Advanced Business Integrations',
      description: 'Scale your AI implementations across your organization',
      courseTitle: 'ChatGPT Mastery',
      nextModuleId: null
    }
  ];
  
  // Modules du cours AI Bot Builder
  const botBuilderModules = [
    {
      id: 1,
      title: 'Bot Design Principles',
      description: 'Learn the fundamentals of effective chatbot design',
      courseTitle: 'AI Bot Builder',
      nextModuleId: 2
    },
    {
      id: 2,
      title: 'Conversation Flow Architecture',
      description: 'Design structured conversations that deliver a seamless user experience',
      courseTitle: 'AI Bot Builder',
      nextModuleId: 3
    },
    {
      id: 3,
      title: 'NLP Integration',
      description: 'Leverage natural language processing to understand user inputs',
      courseTitle: 'AI Bot Builder',
      nextModuleId: 4
    },
    {
      id: 4,
      title: 'Platform Deployment',
      description: 'Deploy your bot across multiple messaging platforms',
      courseTitle: 'AI Bot Builder',
      nextModuleId: 5
    },
    {
      id: 5,
      title: 'Analytics and Optimization',
      description: 'Measure bot performance and continuously improve your solution',
      courseTitle: 'AI Bot Builder',
      nextModuleId: null
    }
  ];
  
  // Modules du cours Advanced Prompt Engineering
  const promptEngineeringModules = [
    {
      id: 1,
      title: 'Prompt Engineering Theory',
      description: 'Master the foundational principles of effective prompt engineering',
      courseTitle: 'Advanced Prompt Engineering',
      nextModuleId: 2
    },
    {
      id: 2,
      title: 'Advanced Control Techniques',
      description: 'Learn sophisticated methods to precisely control AI outputs',
      courseTitle: 'Advanced Prompt Engineering',
      nextModuleId: 3
    },
    {
      id: 3,
      title: 'Multi-model Prompt Strategies',
      description: 'Adapt your prompting techniques across different AI models',
      courseTitle: 'Advanced Prompt Engineering',
      nextModuleId: 4
    },
    {
      id: 4,
      title: 'Creative Applications Workshop',
      description: 'Apply advanced prompting techniques to creative tasks',
      courseTitle: 'Advanced Prompt Engineering',
      nextModuleId: 5
    },
    {
      id: 5,
      title: 'Optimization and Testing',
      description: 'Systematically improve your prompts through testing methodologies',
      courseTitle: 'Advanced Prompt Engineering',
      nextModuleId: null
    }
  ];
  
  // Modules du cours Midjourney Image Generation Mastery
  const midjourneyModules = [
    {
      id: 1,
      title: 'Midjourney Fundamentals',
      description: 'Get started with Midjourney and learn the essential commands',
      courseTitle: 'Midjourney Image Generation Mastery',
      nextModuleId: 2
    },
    {
      id: 2,
      title: 'Prompt Crafting for Images',
      description: 'Master the art of writing effective prompts for stunning visuals',
      courseTitle: 'Midjourney Image Generation Mastery',
      nextModuleId: 3
    },
    {
      id: 3,
      title: 'Style Development',
      description: 'Create consistent visual styles and develop your unique aesthetic',
      courseTitle: 'Midjourney Image Generation Mastery',
      nextModuleId: 4
    },
    {
      id: 4,
      title: 'Advanced Parameter Control',
      description: 'Fine-tune your images with Midjourney\'s advanced parameters',
      courseTitle: 'Midjourney Image Generation Mastery',
      nextModuleId: 5
    },
    {
      id: 5,
      title: 'Commercial Application Workshop',
      description: 'Apply your Midjourney skills to real-world commercial projects',
      courseTitle: 'Midjourney Image Generation Mastery',
      nextModuleId: null
    }
  ];
  
  // Sélectionner le tableau de modules en fonction du cours
  let modules;
  switch (courseSlug) {
    case 'ai-bot-builder':
      modules = botBuilderModules;
      break;
    case 'prompt-engineering':
      modules = promptEngineeringModules;
      break;
    case 'midjourney-mastery':
      modules = midjourneyModules;
      break;
    case 'chatgpt-mastery':
    default:
      modules = chatgptModules;
  }
  
  const matchedModule = modules.find(m => m.id === parseInt(moduleId));
  
  if (matchedModule) {
    return matchedModule;
  }
  
  // Renvoyer un module par défaut si l'ID spécifié n'existe pas
  return {
    id: parseInt(moduleId) || 1,
    title: `Module ${moduleId || 1}`,
    description: 'Module content coming soon',
    courseTitle: courseSlug === 'chatgpt-mastery' ? 'ChatGPT Mastery' : 
                 courseSlug === 'ai-bot-builder' ? 'AI Bot Builder' :
                 courseSlug === 'prompt-engineering' ? 'Advanced Prompt Engineering' :
                 courseSlug === 'midjourney-mastery' ? 'Midjourney Image Generation Mastery' : 'Course',
    nextModuleId: parseInt(moduleId) < modules.length ? parseInt(moduleId) + 1 : null
  };
}

/**
 * Obtient les métadonnées par défaut pour les leçons d'un module
 * @param {number} moduleId - L'ID du module
 * @param {string} courseSlug - Le slug du cours
 * @returns {Array} Un tableau de métadonnées de leçons
 */
function getDefaultLessonMetadata(moduleId, courseSlug = 'chatgpt-mastery') {
  // Leçons du cours ChatGPT Mastery
  const chatgptLessons = {
    1: [
      { id: 1, title: 'Introduction to AI and Large Language Models', duration: '15 min' },
      { id: 2, title: 'Understanding ChatGPT: Capabilities and Limitations', duration: '20 min' },
      { id: 3, title: 'Setting Up Your ChatGPT Workspace', duration: '10 min' },
      { id: 4, title: 'Free vs Paid: Which Plan Is Right For You?', duration: '15 min' },
      { id: 5, title: 'Advanced Prompting Techniques for ChatGPT', duration: '25 min' }
    ],
    2: [
      { id: 1, title: 'Using the ChatGPT API', duration: '30 min' },
      { id: 2, title: 'Basic Prompt Structure and Best Practices', duration: '25 min' },
      { id: 3, title: 'Using Context to Guide ChatGPT', duration: '20 min' },
      { id: 4, title: 'Step-by-Step Instructions for Complex Tasks', duration: '35 min' },
      { id: 5, title: 'Common Mistakes and How to Avoid Them', duration: '25 min' }
    ],
    3: [
      { id: 1, title: 'Role-Based Prompting for Specialized Knowledge', duration: '30 min' },
      { id: 2, title: 'Using System Messages to Guide AI Behavior', duration: '25 min' },
      { id: 3, title: 'Chain-of-Thought Reasoning for Complex Problems', duration: '40 min' },
      { id: 4, title: 'Temperature and Top-P Settings: Controlling Creativity', duration: '20 min' },
      { id: 5, title: 'Advanced Parameter Tuning for Optimal Results', duration: '30 min' }
    ],
    4: [
      { id: 1, title: 'Writing Compelling Marketing Copy', duration: '35 min' },
      { id: 2, title: 'Creating Blog Posts and Articles with AI', duration: '40 min' },
      { id: 3, title: 'SEO Optimization Techniques with ChatGPT', duration: '30 min' },
      { id: 4, title: 'Email Marketing Campaigns and Newsletters', duration: '25 min' },
      { id: 5, title: 'Social Media Content Creation Strategies', duration: '35 min' }
    ],
    5: [
      { id: 1, title: 'Customer Service Automation with ChatGPT', duration: '30 min' },
      { id: 2, title: 'Creating Sales Scripts and Follow-up Sequences', duration: '25 min' },
      { id: 3, title: 'Market Research and Competitive Analysis', duration: '35 min' },
      { id: 4, title: 'Product Descriptions and E-commerce Copy', duration: '30 min' },
      { id: 5, title: 'Business Plan and Proposal Generation', duration: '40 min' }
    ],
    6: [
      { id: 1, title: 'Generating Code with ChatGPT', duration: '35 min' },
      { id: 2, title: 'Debugging and Code Review Assistance', duration: '30 min' },
      { id: 3, title: 'API Integration Best Practices', duration: '40 min' },
      { id: 4, title: 'Building Custom GPT Agents', duration: '45 min' },
      { id: 5, title: 'ChatGPT Plugins Development', duration: '50 min' }
    ],
    7: [
      { id: 1, title: 'Designing Your Bot\'s Personality and Purpose', duration: '25 min' },
      { id: 2, title: 'Crafting Effective Knowledge Bases', duration: '30 min' },
      { id: 3, title: 'Setting Up GPTs with Custom Instructions', duration: '35 min' },
      { id: 4, title: 'Integrating External Tools and APIs', duration: '40 min' },
      { id: 5, title: 'Testing and Optimizing Bot Performance', duration: '30 min' }
    ],
    8: [
      { id: 1, title: 'Building an AI Strategy for Your Organization', duration: '40 min' },
      { id: 2, title: 'Workflow Automation with ChatGPT', duration: '35 min' },
      { id: 3, title: 'Training Teams to Work with AI Effectively', duration: '30 min' },
      { id: 4, title: 'Measuring ROI on AI Implementations', duration: '25 min' },
      { id: 5, title: 'Ethical Considerations and Best Practices', duration: '35 min' }
    ]
  };
  
  // Leçons du cours AI Bot Builder
  const botBuilderLessons = {
    1: [
      { id: 1, title: 'Introduction to Conversational AI', duration: '25 min' },
      { id: 2, title: 'User-Centered Bot Design', duration: '30 min' },
      { id: 3, title: 'Planning Bot Capabilities', duration: '35 min' },
      { id: 4, title: 'Defining Bot Personality', duration: '25 min' },
      { id: 5, title: 'Creating Conversational Flows', duration: '35 min' }
    ],
    2: [
      { id: 1, title: 'Conversation Branching Techniques', duration: '30 min' },
      { id: 2, title: 'Managing Context in Conversations', duration: '40 min' },
      { id: 3, title: 'Handling User Intents', duration: '35 min' },
      { id: 4, title: 'Error Handling and Graceful Fallbacks', duration: '25 min' },
      { id: 5, title: 'Implementing Multi-turn Dialogues', duration: '40 min' }
    ],
    3: [
      { id: 1, title: 'NLP Fundamentals for Bot Builders', duration: '30 min' },
      { id: 2, title: 'Intent Recognition Systems', duration: '35 min' },
      { id: 3, title: 'Entity Extraction Techniques', duration: '40 min' },
      { id: 4, title: 'Sentiment Analysis in Conversations', duration: '25 min' },
      { id: 5, title: 'Fine-tuning NLP Models for Your Use Case', duration: '45 min' }
    ],
    4: [
      { id: 1, title: 'Choosing the Right Bot Platform', duration: '25 min' },
      { id: 2, title: 'Deploying on Facebook Messenger', duration: '35 min' },
      { id: 3, title: 'Implementing on Slack and Teams', duration: '40 min' },
      { id: 4, title: 'Creating Omnichannel Bot Experiences', duration: '30 min' },
      { id: 5, title: 'Managing Bot Deployment Lifecycles', duration: '35 min' }
    ],
    5: [
      { id: 1, title: 'Setting Up Bot Analytics', duration: '30 min' },
      { id: 2, title: 'Tracking Conversation Metrics', duration: '25 min' },
      { id: 3, title: 'Identifying and Fixing Conversation Bottlenecks', duration: '40 min' },
      { id: 4, title: 'A/B Testing Bot Responses', duration: '35 min' },
      { id: 5, title: 'Continuous Learning and Improvement', duration: '40 min' }
    ]
  };
  
  // Leçons du cours Advanced Prompt Engineering
  const promptEngineeringLessons = {
    1: [
      { id: 1, title: 'The Evolution of LLMs and Prompting', duration: '25 min' },
      { id: 2, title: 'Understanding Token Limitations', duration: '20 min' },
      { id: 3, title: 'Prompting Paradigms and Methodologies', duration: '35 min' },
      { id: 4, title: 'The Role of Context in LLM Responses', duration: '25 min' },
      { id: 5, title: 'Evaluating Prompt Effectiveness', duration: '30 min' }
    ],
    2: [
      { id: 1, title: 'Designing Multi-part Prompts', duration: '30 min' },
      { id: 2, title: 'Controlling Response Format and Structure', duration: '25 min' },
      { id: 3, title: 'Constraining Output with Explicit Boundaries', duration: '30 min' },
      { id: 4, title: 'Creating Guardrails for Safety and Accuracy', duration: '35 min' },
      { id: 5, title: 'Advanced Few-Shot Prompting Patterns', duration: '40 min' }
    ],
    3: [
      { id: 1, title: 'Comparing GPT-3.5 vs. GPT-4 Prompting', duration: '30 min' },
      { id: 2, title: 'Adapting Prompts for Claude and Anthropic Models', duration: '35 min' },
      { id: 3, title: 'Open Source Model Prompting (Llama, Mistral)', duration: '40 min' },
      { id: 4, title: 'Cross-Model Prompt Optimization', duration: '25 min' },
      { id: 5, title: 'Specialized Models for Specialized Tasks', duration: '30 min' }
    ],
    4: [
      { id: 1, title: 'Storytelling and Narrative Engineering', duration: '35 min' },
      { id: 2, title: 'Character and Dialogue Creation', duration: '30 min' },
      { id: 3, title: 'Poetry and Creative Writing Prompts', duration: '25 min' },
      { id: 4, title: 'Idea Generation and Brainstorming', duration: '30 min' },
      { id: 5, title: 'Creating Visual Descriptions for Image Generation', duration: '40 min' }
    ],
    5: [
      { id: 1, title: 'A/B Testing Prompt Variations', duration: '25 min' },
      { id: 2, title: 'Creating Prompt Test Suites', duration: '30 min' },
      { id: 3, title: 'Measuring Prompt Performance Metrics', duration: '35 min' },
      { id: 4, title: 'Building a Prompt Optimization Workflow', duration: '40 min' },
      { id: 5, title: 'From Prompt to Prompt Library: Scaling Your Approach', duration: '35 min' }
    ]
  };
  
  // Leçons du cours Midjourney Image Generation Mastery
  const midjourneyLessons = {
    1: [
      { id: 1, title: 'Introduction to AI Image Generation', duration: '20 min' },
      { id: 2, title: 'Creating Your First Midjourney Images', duration: '25 min' },
      { id: 3, title: 'Basic Prompt Structure and Keywords', duration: '30 min' },
      { id: 4, title: 'Understanding Midjourney Versions', duration: '25 min' },
      { id: 5, title: 'Navigating the Discord Interface', duration: '15 min' }
    ],
    2: [
      { id: 1, title: 'Creating Specific Visual Styles', duration: '35 min' },
      { id: 2, title: 'Using Reference Images with --img Parameter', duration: '30 min' },
      { id: 3, title: 'Color Control and Composition', duration: '25 min' },
      { id: 4, title: 'Controlling Lighting and Atmosphere', duration: '30 min' },
      { id: 5, title: 'Weighting Prompt Elements', duration: '25 min' }
    ],
    3: [
      { id: 1, title: 'Finding Your Visual Voice', duration: '30 min' },
      { id: 2, title: 'Consistent Character Design', duration: '35 min' },
      { id: 3, title: 'Creating Style Libraries', duration: '25 min' },
      { id: 4, title: 'Remixing and Combining Styles', duration: '30 min' },
      { id: 5, title: 'From Concept to Final Image', duration: '40 min' }
    ],
    4: [
      { id: 1, title: 'Aspect Ratio and Resolution Control', duration: '25 min' },
      { id: 2, title: 'Using the --stylize Parameter', duration: '30 min' },
      { id: 3, title: 'Seed Values for Consistency', duration: '35 min' },
      { id: 4, title: 'Advanced Composition with --chaos', duration: '25 min' },
      { id: 5, title: 'Multi-step Generation Techniques', duration: '40 min' }
    ],
    5: [
      { id: 1, title: 'Creating Professional Product Visuals', duration: '35 min' },
      { id: 2, title: 'Designing Marketing Campaign Assets', duration: '30 min' },
      { id: 3, title: 'Concept Art for Products and Spaces', duration: '40 min' },
      { id: 4, title: 'Understanding Licensing and Copyright', duration: '25 min' },
      { id: 5, title: 'Building a Midjourney Visual Portfolio', duration: '30 min' }
    ]
  };
  
  // Sélectionner le tableau de leçons en fonction du cours
  let allLessons;
  switch (courseSlug) {
    case 'ai-bot-builder':
      allLessons = botBuilderLessons;
      break;
    case 'prompt-engineering':
      allLessons = promptEngineeringLessons;
      break;
    case 'midjourney-mastery':
      allLessons = midjourneyLessons;
      break;
    case 'chatgpt-mastery':
    default:
      allLessons = chatgptLessons;
  }
  
  // Vérifier si les métadonnées de leçon existent pour le module demandé
  if (allLessons[moduleId]) {
    return allLessons[moduleId];
  }
  
  // Sinon, renvoyer des leçons par défaut
  return [
    { id: 1, title: 'Lesson 1', duration: '20 min' },
    { id: 2, title: 'Lesson 2', duration: '25 min' },
    { id: 3, title: 'Lesson 3', duration: '30 min' },
    { id: 4, title: 'Lesson 4', duration: '20 min' },
    { id: 5, title: 'Lesson 5', duration: '25 min' }
  ];
} 