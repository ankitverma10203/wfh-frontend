import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { config } from "dotenv";

config();

async function generateSitemap() {
  const hostname = process.env.VITE_SITE_URL;

  const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/dashboard", changefreq: "weekly", priority: 0.8 },
    { url: "/approval", changefreq: "weekly", priority: 0.7 },
    { url: "/employeeDetails", changefreq: "monthly", priority: 0.6 },
    { url: "/wfhAllocation", changefreq: "yearly", priority: 0.6 },
  ];

  const sitemap = new SitemapStream({ hostname: hostname });
  const writeStream = createWriteStream("./public/sitemap.xml");

  sitemap.pipe(writeStream);
  links.forEach((link) => sitemap.write(link));
  sitemap.end();

  await streamToPromise(sitemap);
  console.log("Sitemap generated successfully!");
}

generateSitemap().catch((err) => {
  console.error("Error generating sitemap:", err);
});
