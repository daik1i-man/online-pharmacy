import { NextRequest, NextResponse } from "next/server";
import createMiddleware from 'next-intl/middleware';
import { routing } from "./i18n/routing";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
    const cookieStorage = cookies();
    const admin = cookieStorage.get('admin')
    const url = req.nextUrl;

    const defaultLocale = cookieStorage.get('NEXT_LOCALE');

    const handleI18nRouting = createMiddleware(routing)

    if (url.pathname === '/') {
        return NextResponse.redirect(new URL(`/${defaultLocale?.value}`, req.url));
    }

    if (admin && url.pathname === `/${defaultLocale?.value}`) {
        return NextResponse.redirect(new URL(`/${defaultLocale?.value}/dashboard/categories`, req.url));
    }

    if (!admin && url.pathname.startsWith(`/${defaultLocale?.value}/dashboard`)) {
        return NextResponse.redirect(new URL(`/${defaultLocale?.value}`, req.url));
    }

    return handleI18nRouting(req);
}

export const config = {
    matcher: [
        '/(uz|ru)/dashboard/:path*',
        '/(uz|ru)/:path*'
    ]
};
