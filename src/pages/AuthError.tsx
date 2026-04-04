import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AuthError() {
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(3);

  const errorMessage =
    searchParams.get("msg") ||
    "Authentication failed or expired.";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-2xl font-bold text-red-500">
        Authentication Error
      </h1>

      <p className="mt-2 text-gray-600">{errorMessage}</p>

      <p className="mt-2 text-sm text-gray-500">
        Redirecting in {countdown}s...
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Go Home
      </button>
    </div>
  );
}