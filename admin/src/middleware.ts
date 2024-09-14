import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
    const cookieStorage = cookies()
    const admin = cookieStorage.get('admin')
    const url = req.nextUrl

    if (admin && url.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard/categories', req.url))
    }

    if (!admin && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', req.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/']
}