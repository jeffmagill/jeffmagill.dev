import { getPostFeed } from '@/utils/feed';
import { getPostMetadata } from '@/utils/metadata';

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
  const type = params.type;

  let response: Response;

  if (type === 'posts.xml') {
    const feed = getPostFeed();
    response = new Response(feed.xml(), {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
      },
    });
  } else if (type === 'posts.json') {
    const posts = getPostMetadata();
    response = new Response(JSON.stringify(posts), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  } else {
    response = new Response('Not Found', { status: 404 });
  }

  return response;
}
