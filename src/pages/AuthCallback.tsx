import { useEffect } from "react";

export default function AuthCallback() {
  useEffect(() => {
    // Simulate login success and redirect
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Logging you in...</p>
      </div>
    </div>
  );
}