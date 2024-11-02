/**
 * PostDate Component
 *
 * Renders a created date or lastUpdated date based on timestamps
 *
 * @param props - Component props containing created and lastUpdated parameter
 * @returns Rendered PostDate component
 */

/**
 * Formats a Unix timestamp into a human-readable date string
 *
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string or null if timestamp is invalid
 */
const formatDate = (timestamp: string): string | null => {
  if (!timestamp) return null;

  return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Determines display date and text based on publish and update timestamps
 *
 * @param created - Unix timestamp for publish date
 * @param lastUpdated - Unix timestamp for last update
 * @returns Object containing display text and formatted date
 */
const getPostDate = (created: string, lastUpdated: string) => {
  // Get current ISO timestamp for fallback
  const now = new Date().toISOString();
  
  // Check if post was updated and update is newer than creation
  const isUpdated = lastUpdated && lastUpdated > created;
  
  // Return object with all display properties:
  // - displayDateTime: ISO timestamp to show (update/create/current date)
  // - displayText: Label to show ("Updated on" or "Published on")
  // - displayDate: Formatted date string for display
  return {
    displayDateTime: isUpdated ? lastUpdated : created || now,
    displayText: isUpdated ? 'Updated on' : 'Published on',
    displayDate: formatDate(isUpdated ? lastUpdated : created || now)
  };
};

interface PostDateProps {
  created: string;
  lastUpdated?: string;
}

/**
 * PostDate component that displays the publish or modified date
 *
 * @param props - Component props containing created and lastUpdated dates
 * @returns Rendered PostDate component
 */
export default function PostDate({ created, lastUpdated }: PostDateProps) {
  // Get display date information
  const { displayDateTime, displayText, displayDate } = getPostDate(
    created,
    lastUpdated ?? ''
  );

  return (
    <span>
      {displayText} <time dateTime={displayDateTime}>{displayDate}</time>
    </span>
  );
}
