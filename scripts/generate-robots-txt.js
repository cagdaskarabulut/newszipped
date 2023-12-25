const fs = require("fs");
const path = require("path");

function getNowWithISOFormat() {
  const today = new Date();
  return today.toISOString();
}

function replaceStringForUrlFormat(myString) {
  myString = myString.replace(/ /g, "-");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.replace(/ó/g, "o");
  myString = myString.replace(",", "");
  // myString = myString.toLowerCase();
  return myString;
}

function generateRobotsTxtAndSitemapXml() {

  let rootPath = `https://newszipped.com`;
  let subDomainrootPath = `https://www.newszipped.com`;
  let now = getNowWithISOFormat();
  let dynamicRobotsTxtFields = "";
  let dynamicSitemapFields = `
<url>
<loc>
${rootPath}
</loc>
<lastmod>
${now}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.7
</priority>
</url>
<url>
<loc>
${subDomainrootPath}
</loc>
<lastmod>
${now}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.7
</priority>
</url>
  `;

  fetch("https://www.newszipped.com/api/article_summary_url_list")
  .then((res) => res.json())
  .then((dataList) => {
    dataList?.article_summary_url_list?.rows.map((article, index) => {
      let url = article.url;
        dynamicRobotsTxtFields = `${dynamicRobotsTxtFields}Allow: /${url}
`;

        dynamicSitemapFields = `${dynamicSitemapFields}
<url>
<loc>
${rootPath}/${url}
</loc>
<lastmod>
${now}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.7
</priority>
</url>
`;

let activePath = `${replaceStringForUrlFormat(article.name)}/${replaceStringForUrlFormat(skinObject.name)}`;

            dynamicSitemapFields = `${dynamicSitemapFields}
<url>
<loc>
${rootPath}/${activePath}
</loc>
<lastmod>
${now}
</lastmod>
<changefreq>
daily
</changefreq>
<priority>
0.7
</priority>
</url>
`;

            let robotsTxt = "";
//-generate final
            robotsTxt = 
`# *
User-agent: *
${dynamicRobotsTxtFields}
Disallow: /AdminPanel
Disallow: /AdminPanelLogin
# Sitemaps
Sitemap: https://www.newszipped.com/sitemap.xml`;
          
//-generate final
            let sitemapXml = "";
            sitemapXml = 
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${dynamicSitemapFields}
</urlset>
            `;

            fs.writeFileSync("public/robots.txt", robotsTxt);
            fs.writeFileSync("public/sitemap.xml", sitemapXml);
      });
    });
}

module.exports = generateRobotsTxtAndSitemapXml;