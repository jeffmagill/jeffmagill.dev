import { getPostFeed } from '@/utils/feed';
import { getPosts } from '@/utils/posts';

export const generateStaticParams = async (): Promise<{ type: string }[]> => {
  const params = ['posts.xml', 'posts.json'].map((type) => ({
    type: type,
  }));
  return params;
};

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  if (params.type === 'posts.xml') {
    // Serve up the RSS feed
    const feed = getPostFeed();
    return new Response(feed.xml(), {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
      },
    });
  } else if (params.type === 'posts.json') {
    // Serve up posts as JSON
    const posts = getPosts();
    return new Response(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } else {
    return new Response('Not Found', { status: 404 });
  }
}
