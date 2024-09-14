import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
    const cookieStorage = cookies();
    const user = cookieStorage.get('user');
    const url = req.nextUrl;

    if (user && url.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!user && (url.pathname.startsWith('/user') || url.pathname === '/checkout')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/user/:path*', '/checkout', '/auth/:path*'],
};
