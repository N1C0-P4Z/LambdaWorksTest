import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3000/api";

function getBackendHeaders() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  return headers;
}

async function getIdFromContext(context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  return id;
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const id = await getIdFromContext(context);

  try {
    const response = await fetch(`${BACKEND_API_URL}/contactos/${id}`, {
      method: "GET",
      headers: getBackendHeaders(),
      cache: "no-store",
    });

    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "No se pudo obtener el contacto" },
      { status: 503 }
    );
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const id = await getIdFromContext(context);

  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_API_URL}/contactos/${id}`, {
      method: "PUT",
      headers: getBackendHeaders(),
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "No se pudo actualizar el contacto" },
      { status: 503 }
    );
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const id = await getIdFromContext(context);

  try {
    const response = await fetch(`${BACKEND_API_URL}/contactos/${id}`, {
      method: "DELETE",
      headers: getBackendHeaders(),
      cache: "no-store",
    });

    const payload = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: "No se pudo eliminar el contacto" },
      { status: 503 }
    );
  }
}
