"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Importation dynamique de Mermaid pour éviter les problèmes de SSR
const mermaid = dynamic(() => import("mermaid"), { ssr: false });

export default function MermaidChart({ chart }) {
  const containerRef = useRef(null);
  const chartId = useRef(`mermaid-${Math.random().toString(36).substring(2, 11)}`);
  const [expanded, setExpanded] = useState(false);
  const [svgContent, setSvgContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fonction pour basculer l'état d'expansion
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    // Fonction d'initialisation de Mermaid
    const initializeMermaid = async () => {
      try {
        if (!containerRef.current) return;

        setIsLoading(true);
        setErrorMessage('');

        // Initialiser Mermaid avec des options
        const mermaidAPI = await import("mermaid");
        if (!mermaidAPI.default.initialize) {
          setErrorMessage("Erreur: API Mermaid non disponible");
          setIsLoading(false);
          return;
        }

        mermaidAPI.default.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          fontSize: 16,
          fontFamily: "'Fira Code', 'JetBrains Mono', 'SF Mono', monospace",
          flowchart: {
            curve: "basis",
            htmlLabels: true
          },
          er: {
            useMaxWidth: false
          },
          sequence: {
            useMaxWidth: false,
            showSequenceNumbers: false
          },
          gantt: {
            useMaxWidth: false
          }
        });

        // Rendre le diagramme
        try {
          const { svg } = await mermaidAPI.default.render(
            chartId.current,
            chart.trim()
          );
          
          // Sauvegarder le contenu SVG pour pouvoir le réutiliser lors de l'expansion
          setSvgContent(svg);
          setIsLoading(false);
        } catch (renderError) {
          console.error("Mermaid rendering error:", renderError);
          setErrorMessage(renderError.message || "Erreur inconnue");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Mermaid initialization error:", error);
        setErrorMessage("Erreur d'initialisation de Mermaid");
        setIsLoading(false);
      }
    };

    // Exécuter l'initialisation une fois le composant monté
    initializeMermaid();

  }, [chart]);

  // Rendu des contrôles et du contenu
  return (
    <div className={`mermaid-wrapper ${expanded ? 'expanded-wrapper' : ''}`}>
      <div className="mermaid-controls">
        <button 
          onClick={toggleExpand} 
          className="mermaid-control-btn"
          title={expanded ? "Réduire le diagramme" : "Agrandir le diagramme"}
        >
          {expanded ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
              <span>Réduire</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
              <span>Agrandir</span>
            </>
          )}
        </button>
      </div>
      
      <div 
        ref={containerRef} 
        className={`mermaid-container ${expanded ? 'expanded' : ''}`}
      >
        {isLoading ? (
          <div className="mermaid-loading">
            <div className="text-center text-sm text-gray-400 p-4 bg-gray-100 rounded">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-500 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Chargement du diagramme...
            </div>
          </div>
        ) : errorMessage ? (
          <div className="mermaid-error">
            <p>Erreur de rendu du diagramme:</p>
            <pre>{errorMessage}</pre>
            <pre>{chart}</pre>
          </div>
        ) : (
          <div 
            className="mermaid-content" 
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />
        )}
      </div>
      
      {expanded && (
        <div className="mermaid-overlay-controls">
          <button 
            onClick={toggleExpand} 
            className="mermaid-close-btn"
            title="Fermer l'aperçu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
} 