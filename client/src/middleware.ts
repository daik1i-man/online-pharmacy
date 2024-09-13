import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
    const cookieStorage = cookies();
    const userAuthToken = cookieStorage.get('user.auth.token');
    const url = req.nextUrl;

    if (userAuthToken && url.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (!userAuthToken && (url.pathname.startsWith('/user') || url.pathname === '/checkout')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/user/:path*', '/checkout', '/auth/:path*'],
};
