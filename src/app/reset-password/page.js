"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Handle the auth callback from the email link
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setError("Invalid or expired reset link");
        return;
      }
      
      if (data.session) {
        setSessionReady(true);
      } else {
        setError("No active session found. Please request a new password reset link.");
      }
    };

    handleAuthCallback();
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      alert("Password updated successfully! Please log in with your new password.");
      
      await supabase.auth.signOut();
      window.location.href = "/";
    }
  };

  if (!sessionReady) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-[#18181b] w-full max-w-md rounded-xl p-6 shadow-xl border border-gray-700">
          <h2 className="text-white text-2xl font-bold mb-6">Reset Your Password</h2>
          {error ? (
            <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700 text-red-300">
              {error}
            </div>
          ) : (
            <p className="text-gray-400">Verifying reset link...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-[#18181b] w-full max-w-md rounded-xl p-6 shadow-xl border border-gray-700">
        <h2 className="text-white text-2xl font-bold mb-6">Reset Your Password</h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-700 text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
          />

          <button
            onClick={handlePasswordReset}
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}