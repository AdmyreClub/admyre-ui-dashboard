import * as z from "zod"

export const initialFiltersState = {
    keywords: [],
    location: {
      country: '',
      state: '',
      city: ''
    },
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
    engagementRate: null,
    gender: '',
    languages: []
  };

  export const locationSchema = z.object({
    country: z.string().nullable(),
    state: z.string().nullable(),
    city: z.string().nullable(),
  });

  export const ageSchema = z.object({
    from: z.number().nonnegative().nullable(),
    to: z.number().nonnegative().nullable(),
  });

  export const rangeSchema = z.object({
    from: z.number().nonnegative().nullable(),
    to: z.number().nonnegative().nullable(),
  });

  export const filtersSchema = z.object({
    username: z.string().nullable(),
    location: locationSchema,
    age: ageSchema,
    categories: z.array(z.string()).nullable(),
    followers: rangeSchema,
    followings: rangeSchema,
    engagementRate: z.number().nonnegative().nullable(),
    gender: z.string().nullable(),
    languages: z.array(z.string()).nullable(),
  });

  export const followersRangedSchema = z.object({
    followers: rangeSchema,
  });

  export const followingsRangedSchema = z.object({
    followings: rangeSchema,
  });
