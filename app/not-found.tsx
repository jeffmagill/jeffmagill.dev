// /app/not-found.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found',
};

export default function NotFound() {
  return (
    <div
      style={{
        height: '70vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>404 - Page not found </p>
      <h1>OOPSIE! </h1>
      <p>
        Sorry, there is nothing to see here, <a href='/'>go home</a>.{' '}
      </p>
    </div>
  );
}
