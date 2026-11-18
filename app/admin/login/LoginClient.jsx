"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_USERNAME = "adminwise";
const ADMIN_PASSWORD = "Wise123#";
const COOKIE_NAME    = "chene_admin_auth";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export default function LoginClient({ from }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPw, setShowPw]     = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a brief async check
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set auth cookie via document.cookie
        document.cookie = `${COOKIE_NAME}=authenticated; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Strict`;
        router.push(from || "/admin");
        router.refresh();
      } else {
        setError("Invalid username or password.");
        setLoading(false);
      }
    }, 400);
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Logo */}
        <div className="admin-login-logo">
          <span className="admin-login-brand">CHÊNE</span>
          <span className="admin-login-sub">Admin Portal</span>
        </div>

        <h1 className="admin-login-title">Sign in</h1>
        <p className="admin-login-hint">Use your admin credentials to continue.</p>

        <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
          <div className="admin-field">
            <label htmlFor="username" className="admin-label">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="admin-input"
              placeholder="adminwise"
              autoFocus
            />
          </div>

          <div className="admin-field">
            <label htmlFor="password" className="admin-label">Password</label>
            <div className="admin-input-wrap">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="admin-input"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="admin-pw-toggle"
                onClick={() => setShowPw((v) => !v)}
                tabIndex={-1}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="admin-login-error" role="alert">{error}</p>}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading || !username || !password}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
