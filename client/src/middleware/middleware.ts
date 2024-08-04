import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const logged = request.cookies.get("logged")?.value;

    if (request.nextUrl.pathname === "/auth/login") {
        if (logged)
            return NextResponse.redirect(new URL("http://localhost:3000/", request.url));
    }

    return NextResponse.next();
}