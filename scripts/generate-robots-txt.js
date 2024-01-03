//manuel
let isLocal = false; // TODO sadece localde true olacak, yüklenirken false a çevir
//auto
let url = "";
let websiteUrl = "";
const now = getNowWithISOFormat();
const fs = require("fs");

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
  return myString;
}

function addUrlToSitemapList(existingList, newUrl) {
  existingList = `${existingList}
<url>
<loc>
${websiteUrl}/${newUrl}
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
  return existingList;
}

function addUrlToRobotsList(existingList, newUrl) {
  existingList = `${existingList}Allow: /${newUrl}
`;
  return existingList;
}

function generateFinalRobotsTxtFile(robotsTxtFileSource) {
  let result = `# *
User-agent: *
${robotsTxtFileSource}
Disallow: /AdminPanel
Disallow: /AdminPanelLogin
# Sitemaps
Sitemap: https://www.newszipped.com/sitemap.xml`;
  return result;
}

function generateFinalSitemapXmlFile(SitemapXmlFileSource) {
  let result = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${SitemapXmlFileSource}
</urlset>
`;
  return result;
}

function addStaticValuesIntoSitemapList() {
  let result = `
<url>
<loc>
${websiteUrl}
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
${websiteUrl}
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
  return result;
}

function generateRobotsTxtAndSitemapXml() {
  if (!isLocal) {
    url = "https://www.newszipped.com"; //   url = "http://localhost:3000";
    websiteUrl = "https://www.newszipped.com";

    let dynamicRobotsTxtFields = "";

    fetch(url + "/api/article_url_list", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((dataList) => {
        //- add auto generated urls
        dataList?.article_url_list?.rows.map((article, index) => {
          dynamicRobotsTxtFields = addUrlToRobotsList(
            dynamicRobotsTxtFields,
            article.url
          );
          dynamicSitemapFields = addUrlToSitemapList(
            dynamicSitemapFields,
            article.url
          );
        });

        //-generate final files to store
        let robotsTxt = generateFinalRobotsTxtFile(dynamicRobotsTxtFields);
        let sitemapXml = generateFinalSitemapXmlFile(dynamicSitemapFields);

        //-create physical files
        fs.writeFileSync("public/robots.txt", robotsTxt);
        fs.writeFileSync("public/sitemap.xml", sitemapXml);
      });
  }
}

module.exports = generateRobotsTxtAndSitemapXml;
