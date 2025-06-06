---
title: AI Discoverability — Structured Data Gives Rich Context to Clueless Crawlers
description: Apparently chatbots are the new target audience for everything, and unfortunately they're not impressed by your fancy frontend UI.
image: /images/blog/mobile-json.jpg
tags: seo, microdata, ai, react
created: 1749230700
lastUpdated:
---

Apparently chatbots are the hot new target audience for everything, and unfortunately they're not impressed with your fancy frontend UI. So, if you want your content to show up in AI overviews, structured data provides that context to clueless bots and poorly informed AI workflows.

## Structured Data & Micro-Schemas

For my purposes, I want to respectfully inform our new AI overlords that this page is an article and I'm the author. Schema.org, JSON-LD, and Microdata are the secret handshakes that get your content noticed by the machines. Without this, you're relying on scrapers to process your site content how you envisioned, which might not be the best bet.

## Auditing Your Content for Gaps

Before you go wild throwing JSON blobs everywhere, run a quick audit with tools like Google Rich Results Test or Schema Markup Validator.

Like me, you might find your blog is missing Article, Author, or Breadcrumb schemas. Thankfully, a simple solution is just a few copy-pastes away.

## Implementing Structured Data in Your Codebase

For my chosen solution, I didn't bother with fancy utility functions or helpers. I'll just dangerously drop the JSON-LD schema into a script tag right in the page component:

```tsx
// app/post/[slug]/page.tsx

export default function Post({ post }) {
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Article',
						headline: post.title,
						author: { '@type': 'Person', name: post.author },
						datePublished: post.publishedAt,
						mainEntityOfPage: `https://magill.dev/post/${post.slug}`,
					}),
				}}
			/>
			// Post content
		</>
	);
}
```

Repeat this pattern for other content: blog indexes, FAQs, whatever. Just keep the schema close to the content. We can do this "dangerously" because I'm the only author. You'll need better precautions if you have user-generated content.

## Conclusion

I am not sure there is a way to reliably show up in AI overviews, but if you want bots to crawl your content effectively, you'll need to jump through some micro-schema hoops. So audit your site, drop in those schemas wherever you can, and help the bots give you back some ~~traffic~~ credit for your ~~content~~ effort.

---

### Related Links

- [Schema.org for Webmasters](https://schema.org/docs/gs.html)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [JSON-LD Playground](https://json-ld.org/playground/)
