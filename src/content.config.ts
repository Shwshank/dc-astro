import { defineCollection } from 'astro:content'; // Keep this
import { glob } from 'astro/loaders';
import { z } from 'astro/zod'; // Import z from here instead

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),

        // core
        author: z.string().default("Shaw"),
        draft: z.boolean().default(false),

        // structure
        category: z.string(),      // e.g. "safety", "transport"
        tags: z.array(z.string()).default([]),

        // SEO
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),

        // linking system (VERY IMPORTANT)
        relatedGuides: z.array(z.string()).default([]),  // ids
        relatedBlogs: z.array(z.string()).default([]),   // your existing blog slugs

        // UX / branding
        readingTime: z.number().optional(),
        featured: z.boolean().default(false),

        heroImage: z.string().optional(),
        gallery: z.array(z.string()).optional(),
        finalThought_unbiased_opinion: z.string().optional(),
        nextBlog: z.object({
            title1: z.string().optional(),
            description1: z.string().optional(),
            link1: z.string().optional(),
            image1: z.string().optional(),
            category1: z.string().optional(),

            title2: z.string().optional(),
            description2: z.string().optional(),
            link2: z.string().optional(),
            image2: z.string().optional(),
            category2: z.string().optional(),
        }).optional(),
    })
});

export const collections = { blog };