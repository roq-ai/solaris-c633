const mapping: Record<string, string> = {
  appointments: 'appointment',
  blogs: 'blog',
  galleries: 'gallery',
  hospitals: 'hospital',
  'social-medias': 'social_media',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
