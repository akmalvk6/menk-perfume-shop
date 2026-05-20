import { Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

  function submit(event) {
    event.preventDefault();
    if (password !== expectedPassword) {
      setError("Incorrect admin password.");
      return;
    }
    sessionStorage.setItem("menk-admin-auth", "true");
    navigate("/admin", { replace: true });
  }

  return (
    <section className="grid min-h-screen place-items-center bg-ink px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg bg-white p-6 shadow-soft">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-rosewood text-white">
          <Lock size={22} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-normal">Admin login</h1>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Manage products and incoming WhatsApp orders.
        </p>
        <label className="mt-6 block text-sm font-semibold">
          Password
          <input
            className="input mt-1"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <button type="submit" className="btn-primary mt-5 w-full">
          Enter admin
        </button>
      </form>
    </section>
  );
}
