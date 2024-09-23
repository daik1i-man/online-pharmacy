import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
    const userAgent = req.headers.get('user-agent')?.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad/.test(userAgent || '');
    const cookieStorage = cookies();
    const user = cookieStorage.get('user');
    const url = req.nextUrl;
    
    if (user && url.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (url.pathname.startsWith('/user')) {
        if (!user) {
            return NextResponse.redirect(new URL('/auth/login', req.url));
        }

        return NextResponse.next();
    }

    if (!user && (url.pathname === '/checkout')) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/user/:path*', '/checkout', '/auth/:path*', '/'],
};
