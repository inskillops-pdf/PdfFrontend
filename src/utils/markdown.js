import fs from 'fs';
import path from 'path';

// Fonction pour lire le contenu d'un fichier markdown depuis le répertoire du contenu
export const getMarkdownContent = (fileName) => {
  try {
    const contentDirectory = path.join(process.cwd(), 'src/content');
    const fullPath = path.join(contentDirectory, `${fileName}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return fileContents;
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${fileName}.md:`, error);
    return '# Contenu non disponible\n\nDésolé, le contenu de cette leçon n\'est pas disponible pour le moment.';
  }
};

// Fonction pour obtenir tous les fichiers markdown d'un module
export const getModuleFiles = (moduleNumber) => {
  try {
    const contentDirectory = path.join(process.cwd(), 'src/content');
    const files = fs.readdirSync(contentDirectory);
    
    // Filtrer les fichiers du module spécifié
    const moduleFiles = files.filter(
      file => file.startsWith(`module-${moduleNumber}-`) && file.endsWith('.md')
    );
    
    return moduleFiles.map(file => file.replace('.md', ''));
  } catch (error) {
    console.error(`Erreur lors de la lecture des fichiers du module ${moduleNumber}:`, error);
    return [];
  }
};

// Fonction pour extraire le numéro de leçon à partir du nom de fichier
export const getLessonNumber = (fileName) => {
  const match = fileName.match(/module-\d+-lesson-(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

// Fonction pour extraire le titre à partir du contenu markdown
export const extractTitle = (content) => {
  const titleMatch = content.match(/^# (.*?)$/m);
  return titleMatch ? titleMatch[1] : 'Sans titre';
}; 