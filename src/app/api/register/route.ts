import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/userStore";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const exists = await findUserByEmail(email);
    if (exists) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    // ✔ FIX: llama correctamente a createUser
    await createUser(name, email, password);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
