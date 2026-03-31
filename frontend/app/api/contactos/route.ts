import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:3000/api";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim();

  const backendUrl = new URL(`${BACKEND_API_URL}/contactos`);
  if (search) {
    backendUrl.searchParams.set("nombre", search);
  }

  try {
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "No se pudo conectar con el backend de contactos" },
      { status: 503 }
    );
  }
}
