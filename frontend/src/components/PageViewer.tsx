import React from "react";
import type { PageItem } from "../api/types";

interface PageViewerProps {
  pages: PageItem[];
}

const PageViewer: React.FC<PageViewerProps> = ({ pages }) => {
  return (
    <div className="page-viewer">
      {pages.map((page) => (
        <div
          key={page.page_number}
          id={`page-${page.page_number}`}
          className="page-card"
        >
          <div className="page-header">
            <h3>Page {page.page_number}</h3>
            <span className="page-anchor">#{page.page_number}</span>
          </div>
          <div className="page-content">
            <pre className="page-text">{page.text}</pre>
          </div>
          {page.entities && page.entities.length > 0 && (
            <div className="page-entities">
              <h4>Entities:</h4>
              <div className="entity-chips">
                {page.entities.map((entity, idx) => (
                  <span
                    key={idx}
                    className={`entity-chip entity-${entity.label.toLowerCase()}`}
                  >
                    {entity.text} <small>({entity.label})</small>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PageViewer;
