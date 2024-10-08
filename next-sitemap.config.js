/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://magill.dev',
  generateIndexSitemap: false,
  generateRobotsTxt: true, 
};
