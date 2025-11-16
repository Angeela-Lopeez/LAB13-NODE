"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Credenciales incorrectas.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 p-4">
      <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] w-full max-w-md border border-white/40">

        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-700 tracking-tight">
          Iniciar Sesión
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={submit} className="space-y-5">

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* BOTÓN LOGIN */}
          <button
            className="w-full py-3 mt-4 rounded-xl text-white text-lg font-medium
            bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500
            hover:opacity-90 transition shadow-md"
          >
            Iniciar sesión
          </button>
        </form>

        <div className="flex items-center my-6">
          <span className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-gray-500 text-sm">o</span>
          <span className="flex-grow h-px bg-gray-200" />
        </div>

        {/* GOOGLE */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-2 py-3 
          bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium shadow-sm transition"
        >
          <FaGoogle />
          Entrar con Google
        </button>

        {/* GITHUB */}
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-2 py-3 mt-3
          bg-gray-900 hover:bg-black text-white rounded-xl font-medium shadow-sm transition"
        >
          <FaGithub />
          Entrar con GitHub
        </button>

        {/* REGISTRO */}
        <p className="text-center mt-6 text-gray-600">
          ¿No tienes cuenta?
          <a
            href="/register"
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Regístrate
          </a>
        </p>

      </div>
    </div>
  );
}
