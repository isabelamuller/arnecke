import { NextResponse, type NextRequest } from "next/server";

const ACCESS_COOKIE_NAME = "site_access";
const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const isSiteOpen = process.env.SITE_OPEN === "true";

  if (isSiteOpen) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const hasAccess = accessToken === process.env.SITE_ACCESS_TOKEN;

  const isAllowedPath =
    hasAccess ||
    pathname === "/coming-soon" ||
    pathname === "/api/unlock" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/pdfs") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname);

  if (isAllowedPath) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  url.pathname = "/coming-soon";
  url.searchParams.set("next", pathname);

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
