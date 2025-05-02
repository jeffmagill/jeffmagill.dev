import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ShareButtons from './ShareButtons';
import styles from './ShareButtons.module.scss';

// Force styles mock to ensure consistent class names in tests
vi.mock('./ShareButtons.module.scss', () => ({
  default: {
    shareButtonList: 'shareButtonList-mock',
    wrapper: 'wrapper-mock',
    shareButton: 'shareButton-mock'
  }
}));

// Don't mock useEffect - instead mock window.location before React is imported
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://test.example.com/post/test'
  },
  writable: true
});

// Mock useState to return a fixed URL value
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useState: (initialValue: string) => {
      // For the URL state, return a fixed value
      if (initialValue === '') {
        return ['https://test.example.com/post/test', vi.fn()];
      }
      // For any other state, use the real implementation
      return actual.useState(initialValue);
    }
  };
});

describe('ShareButtons', () => {
  const mockTitle = 'Test Post Title';
  
  it('renders share links correctly', () => {
    const { container } = render(<ShareButtons title={mockTitle} />);
    
    // Verify heading
    expect(screen.getByText('Share This Post')).toBeInTheDocument();
    
    // Verify the explanatory text
    expect(screen.getByText(/If you found this post interesting/)).toBeInTheDocument();
    
    // Use a more general selector to find all share links
    const links = container.querySelectorAll('a');
    expect(links.length).toBe(5); // Facebook, LinkedIn, Twitter, Reddit, Email
    
    // Check specific share links by their text content
    expect(screen.getByText('Share on Facebook')).toBeInTheDocument();
    expect(screen.getByText('Share on LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Share on X')).toBeInTheDocument();
    expect(screen.getByText('Share on Reddit')).toBeInTheDocument();
    expect(screen.getByText('Share by Email')).toBeInTheDocument();
  });
  
  it('creates correct share URLs', () => {
    const { container } = render(<ShareButtons title={mockTitle} />);
    const currentUrl = 'https://test.example.com/post/test';
    const encodedTitle = encodeURIComponent(mockTitle);
    
    // Use more specific selectors to find the links by their text
    const fbLink = screen.getByText('Share on Facebook').closest('a');
    const linkedinLink = screen.getByText('Share on LinkedIn').closest('a');
    const xLink = screen.getByText('Share on X').closest('a');
    const redditLink = screen.getByText('Share on Reddit').closest('a');
    const emailLink = screen.getByText('Share by Email').closest('a');
    
    // Check Facebook link
    expect(fbLink).toHaveAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`);
    
    // Check LinkedIn link
    expect(linkedinLink).toHaveAttribute('href', `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`);
    
    // Check X/Twitter link
    expect(xLink).toHaveAttribute('href', `http://x.com/share?url=${currentUrl}&text=${encodedTitle}`);
    
    // Check Reddit link
    expect(redditLink).toHaveAttribute('href', `https://reddit.com/submit?url=${currentUrl}&title=${encodedTitle}`);
    
    // Check Email link
    expect(emailLink).toHaveAttribute('href', `mailto:?subject=${encodedTitle}&body=${currentUrl}`);
  });
  
  it('renders share links with correct target and rel attributes', () => {
    render(<ShareButtons title={mockTitle} />);
    
    // Get links by their text content
    const fbLink = screen.getByText('Share on Facebook').closest('a');
    const linkedinLink = screen.getByText('Share on LinkedIn').closest('a');
    const xLink = screen.getByText('Share on X').closest('a');
    const redditLink = screen.getByText('Share on Reddit').closest('a');
    const emailLink = screen.getByText('Share by Email').closest('a');
    
    // Check target and rel for social media links
    [fbLink, linkedinLink, xLink, redditLink].forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
    
    // Email might have different attributes but let's check anyway
    expect(emailLink).toHaveAttribute('target', '_blank');
    expect(emailLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
  
  it('renders FontAwesome icons for each share option', () => {
    const { container } = render(<ShareButtons title={mockTitle} />);
    
    // Check that each share button has an SVG icon
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(5); // At least 5 icons for the 5 share options
  });
});