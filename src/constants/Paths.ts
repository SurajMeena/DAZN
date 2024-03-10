/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Movies: {
    Base: '/movies',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
    Search: '/search',
  },
} as const;
