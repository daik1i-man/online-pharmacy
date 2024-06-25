import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const adminId = req.cookies.get('admin_id');
    console.log(`admin_id cookie: ${adminId}`);

    const loginURL = new URL('/login', req.url);
    const dashboardURL = new URL('/dashboard/categories', req.url);

    if (req.nextUrl.pathname === '/' && adminId) {
        console.log('Redirecting to /dashboard/categories');
        return NextResponse.redirect(dashboardURL);
    }

    const protectedRoutes = ['/dashboard/categories'];
    if (protectedRoutes.includes(req.nextUrl.pathname) && !adminId) {
        console.log('Redirecting to /login');
        return NextResponse.redirect(loginURL);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/dashboard/categories'],
};
