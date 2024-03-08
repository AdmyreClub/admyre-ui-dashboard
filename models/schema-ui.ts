import * as z from "zod";

export const rangeSchema = z.object({
  from: z.number().nullable().default(null),
  to: z.number().nullable().default(null),
});

export const followersRangedSchema = rangeSchema;
export const followingsRangedSchema = rangeSchema;
export const engagementRateSchema = rangeSchema;

export const locationSchema = z.object({
  country: z.string().nullable().default(null),
  state: z.string().nullable().default(null),
  city: z.string().nullable().default(null),
});

export const ageSchema = z.object({
  from: z.number().nullable().default(null),
  to: z.number().nullable().default(null),
});

export const filtersSchema = z.object({
  keywords: z.array(z.string()).default([]),
  location: z.array(z.string()).default([]),
  age: ageSchema,
  categories: z.array(z.string()).default([]),
  followers: followersRangedSchema,
  followings: followingsRangedSchema,
  engagementRate: engagementRateSchema,
  gender: z.string().nullable().default(null),
  languages: z.array(z.string()).default([]),
});

export const initialFiltersState = {
  keywords: [],
  location: [],
  age: {
    from: null,
    to: null
  },
  categories: [],
  followers: {
    from: null,
    to: null
  },
  followings: {
    from: null,
    to: null
  },
  engagementRate: {
    from: null,
    to: null
  },
  gender: null,
  languages: []
};
