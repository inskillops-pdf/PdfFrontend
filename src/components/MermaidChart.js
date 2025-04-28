"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Importation dynamique de Mermaid pour éviter les problèmes de SSR
const mermaid = dynamic(() => import("mermaid"), { ssr: false });

export default function MermaidChart({ chart }) {
  const containerRef = useRef(null);
  const chartId = useRef(`mermaid-${Math.random().toString(36).substring(2, 11)}`);

  useEffect(() => {
    // Fonction d'initialisation de Mermaid
    const initializeMermaid = async () => {
      try {
        if (!containerRef.current) return;

        // Initialiser Mermaid avec des options
        const mermaidAPI = await import("mermaid");
        if (!mermaidAPI.default.initialize) return;

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

        // Nettoyer le conteneur avant le rendu
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
          containerRef.current.className = "mermaid-container";
        }

        // Rendre le diagramme
        try {
          const { svg } = await mermaidAPI.default.render(
            chartId.current,
            chart.trim()
          );
          
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (renderError) {
          console.error("Mermaid rendering error:", renderError);
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="mermaid-error">
                <p>Erreur de rendu du diagramme:</p>
                <pre>${renderError.message || "Erreur inconnue"}</pre>
                <pre>${chart}</pre>
              </div>
            `;
          }
        }
      } catch (error) {
        console.error("Mermaid initialization error:", error);
      }
    };

    // Exécuter l'initialisation une fois le composant monté
    initializeMermaid();

    // Nettoyage lors du démontage
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [chart]);

  return (
    <div 
      ref={containerRef} 
      className="mermaid-container my-6 overflow-auto flex justify-center"
    >
      <div className="text-center text-sm text-gray-400 p-4 bg-gray-100 rounded">
        Chargement du diagramme...
      </div>
    </div>
  );
} 