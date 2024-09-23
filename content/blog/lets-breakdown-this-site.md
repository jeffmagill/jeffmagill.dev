---
title: Let's Breakdown This Site
description: Here I will ramble about what technologies I used to build this website.
image: /images/blog/peter-pryharski-rusted-car-unsplash.jpg
tags: portfolio, tools
last-updated: 1727007398
created: 1727007398
---

I built this website showcase my work and experiment with new (to me) technologies. I needed something fast (to build), easy (to maintain) AND cheap (to host). Contrary to the popular phrase, obtaining all three does NOT violate the prevailing theories of economics. To accomplish this, I selected a robust set of modern frameworks and technologies. Let's dive into the stack:

### Frameworks

- **React:** As a versatile and component-based library, React provides a solid foundation for building dynamic user interfaces. Its declarative syntax and efficient virtual DOM make it a great choice for creating interactive web applications.
- **Next.js:** Built on top of React, Next.js offers a full-featured framework with features like server-side rendering (SSR), static site generation (SSG), and hybrid rendering. This flexibility allows the app to be run in a variety of environments but, more importantly, allows static export for very cheap (Netlify, Cloudflare) or even free hosting (GitHub Pages).

### Styling & Content

- **SASS:** Sass is a powerful CSS preprocessor that extends CSS with features like variables, nesting, and mixins. It helps me write cleaner and more maintainable stylesheets.
- **CSS Modules:** By using CSS modules, I can avoid global namespace collisions and write more modular and reusable styles. This ensures that my styles are scoped to specific components, preventing unintended styling conflicts.
- **Markdown:** Markdown is a lightweight markup language that's easy to write and read. I use Markdown files to store my blog content, allowing me to focus on writing without worrying about HTML formatting.

### Developer Experience

- **TypeScript:** TypeScript adds static typing to JavaScript, making my code more robust and easier to maintain. It helps catch potential errors early in the development process.
- **ESLint:** ESLint is a linter that helps me enforce coding standards and identify potential issues in my JavaScript code.
- **Prettier:** Prettier automatically formats my code according to a consistent style, ensuring that my codebase remains clean and readable.
- **Vitest:** Vitest is a fast unit testing framework that integrates seamlessly with my Next.js project. It helps me write tests to ensure the quality and reliability of my code.

### What was I thinking?

By combining these complementary technologies and methods, I will have a publishing platform that is cheap, scalable, and easy to maintain. This tech stack provides a solid foundation for future growth and allows me to focus on creating useful content.
