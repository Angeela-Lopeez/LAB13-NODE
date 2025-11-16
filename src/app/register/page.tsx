"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      // 👇 AQUÍ ESTABA EL ERROR (antes: /api/auth/register)
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error desconocido");
        return;
      }

      // Registro OK → ir a login
      router.push("/signin");
    } catch (err) {
      console.error(err);
      setError("Error en el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 p-4">
      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] w-full max-w-md border border-white/40">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-700 tracking-tight">
          Crear Cuenta
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        <form onSubmit={submit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="text-gray-600 text-sm">Nombre completo</label>
            <input
              type="text"
              placeholder="Angela Lopez"
              className="w-full px-4 py-2.5 mt-1 bg-white/80 border border-gray-200 rounded-xl
              focus:ring-2 focus:ring-blue-200 focus:border-blue-300
              text-gray-700 placeholder-gray-400 transition shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-600 text-sm">Correo</label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              className="w-full px-4 py-2.5 mt-1 bg-white/80 border border-gray-200 rounded-xl
              focus:ring-2 focus:ring-blue-200 focus:border-blue-300
              text-gray-700 placeholder-gray-400 transition shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-600 text-sm">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2.5 mt-1 bg-white/80 border border-gray-200 rounded-xl
              focus:ring-2 focus:ring-blue-200 focus:border-blue-300
              text-gray-700 placeholder-gray-400 transition shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full py-3 mt-4 rounded-xl text-white text-lg font-medium
            bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500
            hover:opacity-90 transition shadow-md"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          ¿Ya tienes una cuenta?
          <a
            href="/signin"
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
