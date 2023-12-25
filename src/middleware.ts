export {default} from 'next-auth/middleware';

const protectedRoutes = [
    '/clients',
    '/orders',
    '/settings',
    '/profile'
]

export const config = {
    matcher: ['/clients', '/orders', '/settings', '/profile', '/']
}
