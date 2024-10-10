/** @type {import('next-sitemap').IConfig} */
import { settings } from './utils/settings.mjs';

module.exports = {
  siteUrl: process.env.SITE_URL || settings.siteUrl,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
};
