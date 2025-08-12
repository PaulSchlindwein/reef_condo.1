import { z } from 'zod';

export const SiteStatItemSchema = z.object({
  icon: z.enum(['utensils', 'activity', 'map-pin', 'star']).optional().default('star'),
  value: z.string(),
  label: z.string(),
});
export type SiteStatItem = z.infer<typeof SiteStatItemSchema>;

export const RestaurantItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  link: z.string().url().optional().or(z.literal('')).optional(),
  status: z.enum(['active', 'closed', 'seasonal']),
  priceRange: z.enum(['$', '$$', '$$$', '$$$$']),
  location: z.string(),
  highlights: z.array(z.string()).optional().default([]),
}).transform(data => ({
  ...data,
  status: data.status || 'active',
  priceRange: data.priceRange || '$$',
}));
export type RestaurantItem = z.infer<typeof RestaurantItemSchema>;

export const ActivityItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  link: z.string().url().optional().or(z.literal('')).optional(),
  status: z.enum(['active', 'closed', 'seasonal']),
  priceRange: z.enum(['included', '$', '$$', '$$$', '$$$$']),
  location: z.string(),
  ageGroup: z.enum(['all', 'adults', 'kids', 'teens']).optional().default('all'),
  highlights: z.array(z.string()).optional().default([]),
}).transform(data => ({
  ...data,
  status: data.status || 'active',
  priceRange: data.priceRange || 'included',
}));
export type ActivityItem = z.infer<typeof ActivityItemSchema>;

export const AmenityItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  location: z.string(),
  hours: z.string(),
  status: z.enum(['active', 'closed', 'seasonal']),
  link: z.string().url().optional().or(z.literal('')).optional(),
}).transform(data => ({
  ...data,
  status: data.status || 'active',
}));
export type AmenityItem = z.infer<typeof AmenityItemSchema>;

export const AttractionItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  link: z.string().url().optional().or(z.literal('')).optional(),
  status: z.enum(['active', 'closed', 'seasonal']),
  priceRange: z.enum(['$', '$$', '$$$', 'free']),
  location: z.string(),
  distance: z.string(),
  highlights: z.array(z.string()).optional().default([]),
  transportOptions: z.array(z.string()).optional().default([]),
});
export type AttractionItem = z.infer<typeof AttractionItemSchema>;

export const LocalRestaurantItemSchema = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string(),
  link: z.string().url().optional().or(z.literal('')).optional(),
  status: z.enum(['active', 'closed']),
  priceRange: z.enum(['$', '$$', '$$$']),
  location: z.string(),
  distance: z.string(),
  highlights: z.array(z.string()).optional().default([]),
  localFavorite: z.boolean().optional().default(false),
});
export type LocalRestaurantItem = z.infer<typeof LocalRestaurantItemSchema>;

export const TransportationItemSchema = z.object({
  type: z.string(),
  description: z.string(),
  priceRange: z.enum(['$', '$$', '$$$']),
  duration: z.string(),
  highlights: z.array(z.string()).optional().default([]),
  bookingInfo: z.string().optional().default(''),
});
export type TransportationItem = z.infer<typeof TransportationItemSchema>;


