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
const getDisplayDateInfo = (created: string, lastUpdated: string) => {
  // Format both dates
  const publishDate = formatDate(created);
  const modifiedDate = formatDate(lastUpdated);

  let displayDateTime: string;
  let displayText: string;
  let displayDate: string | null;

  // Determine which date to show based on update status
  if (lastUpdated && lastUpdated > created) {
    displayDateTime = lastUpdated;
    displayText = 'Updated on';
    displayDate = modifiedDate;
  } else if (created) {
    displayDateTime = created;
    displayText = 'Published on';
    displayDate = publishDate;
  } else {
    // Fallback to current date if no dates exist
    const currentDate = new Date().toISOString();
    displayDateTime = currentDate;
    displayText = 'Published on';
    displayDate = formatDate(currentDate);
  }

  return { displayDateTime, displayText, displayDate };
};

interface PostDateProps {
  created: string;
  lastUpdated: string;
}

/**
 * PostDate component that displays the publish or modified date
 *
 * @param props - Component props containing created and lastUpdated dates
 * @returns Rendered PostDate component
 */
export default function PostDate({ created, lastUpdated }: PostDateProps) {
  // Get display date information
  const { displayDateTime, displayText, displayDate } = getDisplayDateInfo(
    created,
    lastUpdated
  );

  return (
    <span>
      {displayText} <time dateTime={displayDateTime}>{displayDate}</time>
    </span>
  );
}
