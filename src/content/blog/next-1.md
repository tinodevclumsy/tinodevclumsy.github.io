---
title:  Next.js + Contentful CMS Implementation Journey
description: ""
pubDate: 2025-03-02T02:25:43.245Z
image: "/images/blog/next_contentful.png"
---

## Why I Chose Contentful CMS
Initially, I created a portfolio and blog using Gatsby.js, managing markdown files directly within the project. When planning a new version of my portfolio site, I wanted to manage content more efficiently, which led me to explore CMS options. Among them, I chose Contentful. I also decided to adopt Next.js together.

## Initial Setup
### Environment Variable Configuration
Obtain the necessary tokens from the Contentful dashboard and add them to `.env.local`.
```ts
CONTENTFUL_SPACE_ID=YOUR_SPACE_ID
CONTENTFUL_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
CONTENTFUL_PREVIEW_ACCESS_TOKEN=YOUR_PREVIEW_TOKEN  # Optional
```
*The Preview token is for checking content changes in real-time and can be set up as needed.*

## Implementation of Data Fetching
### 1\. SDK Method (Initial Implementation)
```ts
// utils/contentful.ts
import { createClient } from 'contentful';
const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})
export const getBlogPosts = async () => {
    const results = await client.getEntries({
        content_type: 'blogPost',
    })
    return results.items
}
```

### 2\. REST API Method (Final Implementation)
I switched to the REST API method because the SDK method didn't work in the Cloudflare Pages deployment environment.
```ts
// utils/contentful.ts
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
export async function fetchPosts() {
    const url = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
        },
        query: {
            access_token: CONTENTFUL_ACCESS_TOKEN,
            content_type: 'blogPost'
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    return response.json();
}
export async function fetchPostBySlug(slug: string) {
    const url = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
        },
        query: {
            access_token: CONTENTFUL_ACCESS_TOKEN,
            content_type: 'blogPost',
            'fields.slug': slug
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    const data = await response.json();
    const post = data.items[0];
    if (!post) {
        throw new Error("Post not found");
    }
    return post;
}
```

### Using in Next.js App Router
```ts
const Blog: React.FC = async () => {
    const posts = await fetchPosts();
    // Data processing logic
    return (
        // JSX
    );
}
```

## Improvements
1. Enhanced error handling
2. Added type safety
3. Implemented caching strategy