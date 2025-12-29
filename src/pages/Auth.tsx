import { useState } from "react";
import { useSession } from "../context/SessionContext";

type Mode = "signin" | "signup";

/* ========= VALIDATORS ========= */
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("BASE_URL =", BASE_URL);
const isValidGmail = (email: string) =>
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.trim());

const isValidPhone = (phone: string) =>
  /^[0-9]{10}$/.test(phone);

const isStrongPassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/.test(password);

export default function Auth() {
  const { login } = useSession();
  const [mode, setMode] = useState<Mode>("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");

    /* ========= VALIDATION ========= */
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    if (!isValidGmail(form.email)) {
      setError("Please use a valid Gmail address");
      return;
    }

    if (!isStrongPassword(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    if (mode === "signup") {
      if (!form.name || !form.phone) {
        setError("All fields are required for sign up");
        return;
      }

      if (!isValidPhone(form.phone)) {
        setError("Phone number must be exactly 10 digits");
        return;
      }
    }

    try {
      setLoading(true);

      const url =
  mode === "signup"
    ? `${BASE_URL}/api/auth/signup`
    : `${BASE_URL}/api/auth/login`;
      const payload =
        mode === "signup"
          ? {
              name: form.name,
              email: form.email.trim(),
              phone: form.phone,
              password: form.password,
            }
          : {
              email: form.email.trim(),
              password: form.password,
            };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server error: Invalid JSON response");
      }

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      /* ✅ SESSION IS ALREADY CREATED BY BACKEND */
      login({
        name: data.user.name,
        email: data.user.email,
        sessionId: data.sessionId,
      });

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://assets.architecturaldigest.in/photos/62026064b5d9eefa7e4e2ddf/4:3/w_1439,h_1079,c_limit/How%20to%20furnish%20your%20home%20on%20a%20budget.jpg')",
      }}
    >
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-14">
        <h1 className="text-3xl font-serif text-center mb-1">DecorVista</h1>
        <p className="text-center text-gray-500 mb-6">
          Design your dream space
        </p>

        <div className="flex mb-8 rounded-full bg-gray-100 p-2 gap-2">
          <button
            onClick={() => setMode("signin")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold ${
              mode === "signin" ? "bg-white shadow" : "text-gray-500"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold ${
              mode === "signup" ? "bg-white shadow" : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {mode === "signup" && (
            <>
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="input" />
              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="input" />
            </>
          )}

          <input name="email" placeholder="Gmail address" value={form.email} onChange={handleChange} className="input" />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input pr-14"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-lg text-white font-semibold disabled:opacity-60"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Sign In"}
        </button>
      </div>
    </div>
  );
}
