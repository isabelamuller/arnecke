import { NextResponse } from "next/server";

const ACCESS_COOKIE_NAME = "site_access";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (!process.env.SITE_PASSWORD || !process.env.SITE_ACCESS_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        message: "Site password is not configured.",
      },
      { status: 500 },
    );
  }

  if (password !== process.env.SITE_PASSWORD) {
    return NextResponse.json(
      {
        ok: false,
        message: "Senha incorreta.",
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({
    ok: true,
  });

  response.cookies.set(ACCESS_COOKIE_NAME, process.env.SITE_ACCESS_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
