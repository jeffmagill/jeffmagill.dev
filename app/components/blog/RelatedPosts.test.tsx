import React from 'react';
import { render, screen } from '@testing-library/react';
import RelatedPosts from './RelatedPosts';

describe('RelatedPosts', () => {
  test('renders children and defaults to visible when no IntersectionObserver', () => {
    // Remove IntersectionObserver to simulate older browsers / server
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const OriginalIO = (globalThis as any).IntersectionObserver;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete (globalThis as any).IntersectionObserver;

    render(
      <RelatedPosts>
        <div data-testid="child">child</div>
      </RelatedPosts>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    const wrapper = screen.getByText('Related Articles').parentElement;
    expect(wrapper).toHaveAttribute('data-related-visible', '1');

    // restore
    (globalThis as any).IntersectionObserver = OriginalIO;
  });
});
