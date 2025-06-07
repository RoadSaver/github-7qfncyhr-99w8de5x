import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFound = () => {
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
      <button
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 9999,
          background: "#eab308",
          color: "#222",
          border: "none",
          borderRadius: 8,
          padding: "8px 16px",
          fontWeight: 600,
        }}
        onClick={() => setEditMode((v) => !v)}
      >
        {editMode ? "Exit Text Edit Mode" : "Edit UI Texts"}
      </button>
      {editMode && (
        <div>
          {/* Example of wrapping a text in edit mode */}
          <span contentEditable={true} className="border-b border-dashed">
            example-key
          </span>
        </div>
      )}
    </div>
  );
};

export default NotFound;
