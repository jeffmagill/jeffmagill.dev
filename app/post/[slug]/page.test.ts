import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import * as page from './page';
import postService from '@/utils/PostService';
import { settings } from '@/utils/settings.mjs';

describe('post page helpers', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('generateStaticParams returns slug list', async () => {
		const spy = vi.spyOn(postService, 'getSlugs').mockReturnValue(['a', 'b']);

		const params = await page.generateStaticParams();
		expect(spy).toHaveBeenCalled();
		expect(params).toEqual([{ slug: 'a' }, { slug: 'b' }]);
	});

	it('generateMetadata returns expected metadata structure', async () => {
		const fakePost = {
			title: 'Hello',
			description: 'Desc',
			image: '/img.png',
			created: '2020-01-01',
			lastUpdated: '2020-01-02',
			slug: 'hello',
		} as any;

		vi.spyOn(postService, 'getPost').mockReturnValue(fakePost);

		const meta = await page.generateMetadata({
			params: { slug: 'hello' },
		} as any);

		expect(meta.title).toContain('Hello');
		expect(meta.openGraph).toBeDefined();
		expect(meta.openGraph.images[0].url).toBe(
			`${settings.siteUrl}${fakePost.image}`
		);
	});
});
