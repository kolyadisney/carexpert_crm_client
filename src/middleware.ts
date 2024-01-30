export { default } from 'next-auth/middleware';

const protectedRoutes = ['/client', '/orders', '/settings', '/profile'];

export const config = {
  matcher: [
    '/client',
    '/orders',
    '/cars',
    '/settings',
    '/profile',
    '/',
    '/settings/services',
    '/appointments',
  ],
};
