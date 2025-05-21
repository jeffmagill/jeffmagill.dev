# dev.magill.next

# Intro

This project is a TypeScript/React/Next.JS portfolio and statically generated blogging application for my professional website at https://magill.dev. It includes everything this: analytics, unit testing, static site generation, dynamic routing, social sharing, automated sitemaps, RSS feed, markdown content and more. Learn more about how this site works and was created, on my blog here : https://magill.dev/post/lets-breakdown-this-site.

## Installation

To install, follow these steps:

1. Make sure you have Node.js version 14 or higher installed on your machine.
2. Clone the repository: `git clone https://github.com/andymagill/dev.magill.next.git`
3. Install the project dependencies: `npm install`

## Development

`npm run dev`: Start the development server.

## Building

`npm run build`: Create a production build of the application

`npm run start`: Start the application using SSR in production mode

`npm run serve`: Serve the static version using SSG in production mode

## Testing

`npm run test`: Run the tests using Vitest.

## Code Formatting and Linting

`npm run format`: Check the code for formatting and linting errors.

`npm run fix`: Correct the code according to the project's configuration.

## Technologies Used

**Next.js:** A popular React-based framework for building server-side rendered (SSR) and statically generated websites and applications.

**TypeScript:** A superset of JavaScript that adds optional static typing and other features to improve the development experience.

**ESLint:** A static code analysis tool used to flag suspicious code and enforce coding standards.
Prettier: A code formatter that automatically formats code to a consistent style.

**Vitest:** A fast unit testing framework for JavaScript applications.

**CSS Modules:** A CSS file in which all class names and animation names are scoped locally by default.

## Contribution Guidelines

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Create a [pull request on GitHub](https://github.com/andymagill/dev.magill.next/pulls).

## Project Structure

- `app/components`: Contains all React components.
- `app/pages`: Contains all Next.js pages.
- `utils`: Contains utility functions.
- `public`: Contains static file assets.
- `content`: Contains site content.
