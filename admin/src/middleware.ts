import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { cookies } from "next/headers"

export function middleware(req: NextRequest) {
    const cookieStorage = cookies()
    const adminToken = cookieStorage.get('admin.auth.token')

    const url = req.nextUrl

    if (adminToken && url.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard/categories', req.url))
    }

    if (!adminToken && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/']
}
