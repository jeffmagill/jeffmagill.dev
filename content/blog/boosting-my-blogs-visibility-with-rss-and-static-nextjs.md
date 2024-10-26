---
title: Boosting My Blog’s Visibility with RSS and Static NextJS
description: Let's explore how RSS can boost reach and discoverability in modern blogging as I share how I chose to integrate it into my static NextJS site.
image: /images/blog/mr-cup-fabien-barral-newspapers-unsplash.jpg
tags: methods
created: 1729665414
lastUpdated: 1729665414
---

RSS (Really Simple Syndication) remains a useful tool for bloggers and content creators looking to expand the visibility of their content. By implementing RSS in my static NextJS blog, I hope to enhance my website's reach and simplify a wider distribution of my content. Let’s dive into the benefits of RSS and how I sprinkled it onto my blog like confetti at a party.

### Reach and Discoverability

RSS is the go-to solution for content syndication on the web, allowing content to be shared across multiple websites and social media channels with minimal effort. This capability is especially relevant today, as bloggers and businesses alike scramble to boost their online presence and actually engage with their target audience—because let’s face it, shouting into the void isn’t exactly effective.

RSS is just one method to help prevent my content from getting lost in the digital abyss. Content aggregators can expose my posts to potential readers who probably will not stumble on my blog through other means. This gives my site extra exposure and potential backlinks that could boost SEO credibility. It’s a win-win!

### Choosing the Right Tools

For my static NextJS blog, I'll use the `feed` npm library to generate an RSS feed. It's a straightforward tool that simplifies the process and integrates seamlessly with my project. This way, I can focus on creating content instead of wrestling with complicated setups or maintenance headaches.

Now, let’s get down to configuring that shiny new RSS feed of ours.

1. **Setup**: First things first, install the `feed` library :

```bash
npm install feed
```

HUZZAH! I am now one step closer to becoming an RSS wizard.

2. **Generate Feed Content**: Now, let’s create a utility function to generate our feed content

```javascript
import { Feed } from 'feed';
import { settings } from '@/utils/settings.mjs';

export function generateRssFeed(posts) {
  const feed = new Feed({
    title: settings.title,
    description: settings.description,
    id: settings.site_url,
    link: settings.site_url,
    language: 'en',
    feedLinks: {
      rss2: `${settings.site_url}/rss/feed.xml`,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      description: post.description,
      id: `${settings.site_url}/post/${post.slug}`,
      link: `${settings.site_url}/post/${post.slug}`,
      date: post.created,
    });
  });

  return feed;
}
```

Someday I'll create a unit test for that, pinky swear, but for now...

3. **Write the XML file**: Let's "feed" our blog metadata to the generation function within `getStaticProps` of our index page:

   ```javascript
   import fs from 'fs';
   import { generateRssFeed } from '@/utils/feed.mjs';

   export async function getStaticProps() {
     const posts = await getPostMetadata();
     const feed = generateRssFeed(posts);

     fs.writeFileSync('./public/rss/feed.xml', feed.rss2());

     return {
       props: {
         posts,
       },
     };
   }
   ```

4. **Build for Production**: Finally, lets run the build process to kick out my jams :

   ```bash
   npm run build
   ```

   New posts and content changes will now show up in the feed.xml file, which can be checked into the project's repo or remotely generated.

## The Closing Tag

So, I’ve finally implemented RSS in my NextJS blog—because who doesn’t want to dive into the exciting world of content syndication, am I right? Using the `feed` library to generate the feed at build-time was fairly straight-forward. As I publish fresh content, fingers crossed that this RSS setup will help me reach an audience without resorting to smoke signals or carrier pigeons. After all, in our current age of information overload, every little bit of exposure helps.

### Related Links

- [What is an RSS feed? ](https://www.digitaltrends.com/computing/what-is-an-rss-feed/) From DigitalTrends
- [How Do RSS Feeds Work?](https://rss.com/blog/how-do-rss-feeds-work/) from RSS.com
- [Why am I still recommending the RSS in 2024?](https://medium.com/@kezhang404/why-am-i-still-recommending-the-rss-in-2024-33e270010829) on Medium
