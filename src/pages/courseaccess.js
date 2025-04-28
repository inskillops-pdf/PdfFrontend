import { useState } from 'react';
import Link from 'next/link';

export default function CourseAccess() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Accès aux Cours (Mode Test)</h1>
        
        <div className="mb-8 bg-primary-50 rounded-lg p-4 text-center">
          <p className="text-lg font-semibold mb-3">Vous voulez tester l'inscription au cours?</p>
          <Link href="/courses/chatgpt-mastery/enroll" className="btn-primary py-2 px-4 inline-block">
            Essayer la page d'inscription
          </Link>
        </div>

        <div className="mb-8 bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
          <p className="text-lg font-semibold mb-3">🎉 NOUVEAU: Version style GitHub/Markdown du cours</p>
          <Link href="/courses/chatgpt-mastery/github-style-module" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
            Voir le cours style GitHub
          </Link>
          <p className="text-sm text-gray-600 mt-2">
            Une version plus professionnelle avec un style de documentation technique
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CourseButton 
            title="ChatGPT Mastery Course" 
            href="/courses/chatgpt-mastery-course"
            description="Page principale du cours ChatGPT Mastery" 
          />
          
          <CourseButton 
            title="Module 1: Getting Started" 
            href="/courses/chatgpt-mastery/module-1"
            description="Premier module du cours ChatGPT" 
          />
          
          <CourseButton 
            title="Exercices" 
            href="/courses/chatgpt-mastery/exercises"
            description="Exercices pratiques du cours" 
          />
          
          <CourseButton 
            title="Liste des Cours" 
            href="/courses"
            description="Page principale des cours" 
          />
          
          <CourseButton 
            title="Accueil" 
            href="/"
            description="Page d'accueil du site" 
          />
          
          <CourseButton 
            title="À propos" 
            href="/about"
            description="Page À propos" 
          />
        </div>
      </div>
    </div>
  );
}

function CourseButton({ title, href, description }) {
  return (
    <Link href={href}>
      <div className="border border-gray-200 rounded-lg p-6 hover:bg-primary-50 hover:border-primary-200 transition-colors cursor-pointer">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
} 