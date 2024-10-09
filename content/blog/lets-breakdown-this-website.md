---
title: Let's Breakdown This Website's Tech Stack
description: Here I will ramble about the tools and technologies I used to build this website. 
image: /images/blog/peter-pryharski-rusted-car-unsplash.jpg
tags: tools
created: 1728061704
last-updated: 1728328053
---

When planning this project, I wanted a platform that could showcase my most valuable skills and best work in an impressive way. I needed something fast (to build), easy (to publish) AND cheap (to host). To accomplish this, I selected a robust foundation of technologies with these requirements in mind. Following that plan produced the website you're exploring right now – a blend of cutting-edge frameworks, thoughtful design choices, and solutions to real-world development challenges. Let's dive into the stack:

## Stacking the Foundation

At the heart of this website lies a curated tech stack based on React and Next.js. React's component-based architecture provided the perfect foundation for building a dynamic and interactive user interface. Next.js provided the backend and dev environment to build the site statically, which is required to statisfy two of the initial requirements.

For styling, I opted for a combination of SASS and CSS Modules. SASS allowed me to write more maintainable stylesheets, while CSS Modules ensured that styles remained scoped to specific components. To manage content, I chose Markdown for its simplicity and readability. This decision allowed me to focus on writing without getting bogged down in complex formatting.

## Summoning the Beast

I wanted to share some of the challenges and problems I faced when building this website, and how I tackled them. If you're diving into Next.js or similar project, you might find this useful. I faced several challenges along the way, including:

**Dynamic Routes vs. Static Generation:** These two pillars of modern web development don't always play nice together. However, with the help of Next.js's generateStaticParams function, I managed to pre-render all my blog post pages at build time, making the website lightning fast.

```typescript
export const generateStaticParams = async () => {
  const posts = await getPostMetadata();
  return posts.map((post) => ({ slug: post.slug }));
};
```

**Async File Operations:** Synchronous file operations don't play well with Next.js static exports. Thankfully, switching to asynchronous operations with fs.promises saved the day.

```typescript
import { promises as fs } from 'fs';

async function getPostContent(slug: string) {
  const content = await fs.readFile(`content/blog/${slug}.md`, 'utf8');
  // Process content...
}
```

**TypeScript: My Frenemy:** This love-hate relationship involved wrestling with type mismatches. Being more explicit with my types (like the Post or Project interfaces) helped tame this beast:

```typescript
interface Post {
  title: string;
  description: string;
  content: string;
  image: string;
  tags: string[];
  created: string;
}
```

**Markdown Magic & Front Matter Hero:** Rendering Markdown content as HTML involved the awesome markdown-to-jsx library. Extracting metadata from those Markdown files was made possible by the unsung hero, gray-matter.

```jsx
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
...
const { data, content } = matter(fileContents);
return <Markdown>{post.content}</Markdown>;

```

## Monumental Baby Steps

As I continue to develop this website, I have a handful of exciting ideas to improve it further. My highest priority is to regularly publish interesting and informative blog content. I also hope to expand the project section of the site, showcasing more of my work in greater detail.

On the technical side, I'm looking to enhance blogging functionality and UI. This might include features like improved search capabilities and tag-based filtering. For the project content, I'm exploring ways to create more engaging and dynamic presentations of my work.

Building this website has been an interesting journey. The power and flexibility of modern web development tools has enabled me to carefully tailor the development and editing expereince. I'm curious where this site will take me, as I continue buiding it over the next few years.
