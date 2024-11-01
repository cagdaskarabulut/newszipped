const fs = require("fs");
const rootPath = process.env.URL;
const siteName = process.env.SITE_NAME;
const websiteUrl = process.env.URL_WEBSITE;
const websiteUrlRootomain = process.env.URL_WEBSITE_ROOT_DOMAIN;
const isLocal = process.env.IS_LOCAL;

const now = getNowWithISOFormat();

function getNowWithISOFormat() {
  const today = new Date();
  return today.toISOString();
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
# Sitemaps
Sitemap: ${websiteUrl}/sitemap.xml`;
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
${websiteUrlRootomain}
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

function generateCssFileContent(activeFile) {
  let result = `
//font colors
$fontColor: ${activeFile.fontcolor};
$headerFontColor: ${activeFile.headerfontcolor}; //header font color

//background colors
$backgroundColor: ${activeFile.backgroundcolor};

$headerBackgroundColor1: ${activeFile.headerbackgroundcolor1};
$headerBackgroundColor2: ${activeFile.headerbackgroundcolor2};

$bodyContentBackgroundColor1: ${activeFile.bodycontentbackgroundcolor1};
$bodyContentBackgroundColor2: ${activeFile.bodycontentbackgroundcolor2};

$footerBackgroundColor1: ${activeFile.footerbackgroundcolor1};
$footerBackgroundColor2: ${activeFile.footerbackgroundcolor2};

//component colors
$searchBarColor: ${activeFile.searchbarcolor};

//menu & navigations
$mainMenuSelectedFontColor: ${activeFile.mainmenuselectedfontcolor}; // main menu selected font color

$categoryMenuSelectedBackgroundColor: ${activeFile.categorymenuselectedbackgroundcolor}; // category menu selected background color
$categoryMenuSelectedFontColor: ${activeFile.categorymenuselectedfontcolor}; // category menu selected font color

$orderByMenuSelectedFontColor: ${activeFile.orderbymenuselectedfontcolor}; // order by menu selected font color

//buttons
$tagColor: ${activeFile.tagcolor}; //tag color

$commentButtonFontColor: ${activeFile.commentbuttonfontcolor}; //comment button font color
$commentButtonBackgroundColor: ${activeFile.commentbuttonbackgroundcolor}; //comment button background color
$commentButtonBorderColor: ${activeFile.commentbuttonbordercolor}; //comment button border color

$loginButtonFontColor: ${activeFile.loginbuttonfontcolor}; //login button font color
$loginButtonBackgroundColor: ${activeFile.loginbuttonbackgroundcolor}; //login button background color
$loginButtonBorderColor: ${activeFile.loginbuttonbordercolor}; //login button border color

//no need to change
$errorColor: ${activeFile.errorcolor};
$cautionColor: ${activeFile.cautioncolor};
  `;

  return result;
}

async function generateRobotsTxtAndSitemapXml() {
  if (isLocal === "false") {
    await fetch(rootPath + "/api/article/article_project_auto_generate_files", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((dataList) => {
        //- add auto generated urls
        dataList?.file?.rows.map((activeFile, index) => {
          if (activeFile?.project == siteName) {
            fs.writeFileSync(activeFile?.file_path, activeFile?.file_content);
          }
        });
      });

    await fetch(rootPath + "/api/article/article_project_colors", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((dataList) => {
        //- add css file
        dataList?.fields?.rows.map(async (activeFile, index) => {
          if (activeFile?.project == siteName) {
            let cssFileContent = await generateCssFileContent(activeFile);
            fs.writeFileSync("src/styles/colors.scss", cssFileContent);
          }
        });
      });

    let dynamicRobotsTxtFields = "";
    let dynamicSitemapFields = addStaticValuesIntoSitemapList();
    await fetch(rootPath + "/api/list_url", {
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
      });

    //-generate final files to store
    let robotsTxt = generateFinalRobotsTxtFile(dynamicRobotsTxtFields);
    let sitemapXml = generateFinalSitemapXmlFile(dynamicSitemapFields);

    //-create physical files
    fs.writeFileSync("public/robots.txt", robotsTxt);
    fs.writeFileSync("public/sitemap.xml", sitemapXml);
  }
}

module.exports = generateRobotsTxtAndSitemapXml;
