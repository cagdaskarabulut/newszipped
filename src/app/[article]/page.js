import ArticlePagePanel from "../../components/pageComponents/ArticlePagePanel";
import ScrollToTopButton from "../../components/reusableComponents/ScrollToTopButton";
import NotFoundPage from "../../components/reusableComponents/NotFoundPage";
import Ads from "../../components/mainComponents/Ads";

export const dynamicParams = true; // true | false,
export const revalidate = 86400;

async function getArticle(article) {
  let res = await fetch(process.env.URL + "/api/article/" + article);
  return res.json();
}

async function getMetatags() {
  let res = await fetch(
    process.env.URL + "/api/article/article_project_metatags"
  );
  return res.json();
}

export async function generateStaticParams() {
  const articleUrlList = await fetch(process.env.URL + "/api/list_url").then(
    (res) => res.json()
  );
  return articleUrlList?.article_url_list?.rows.map((p) => ({
    article: p.url,
    // revalidate: 21600,
  }));
}

export async function generateMetadata({ params, searchParams }, parent) {
  let { article } = params;
  let articleData = await getArticle(article);
  let activeArticle = articleData?.article_list?.rows[0] || null;
  let metaData = await getMetatags();
  let metatags = metaData?.metatags?.rows[0] || null;
  let siteName = process.env.PROJECT_SITE_NAME;
  let siteUrl = process.env.URL;
  let imagePath = `https://karabulut-storage.s3.amazonaws.com/${siteName}/favicon.ico`;

  if (!activeArticle) {
    return {
      title: "Makale Bulunamadı",
      description: "Bu makale bulunamadı.",
      keywords: "404, not found",
      image: imagePath,
    };
  }

  let currentFullPathUrl = siteUrl + "/" + article;

  return {
    title: activeArticle?.title || metatags?.title,
    description: activeArticle?.description || metatags?.description,
    keywords: activeArticle?.meta_keys || metatags.keywords,
    applicationName: siteName || "Varsayılan Uygulama",
    publisher: metatags?.publisher || "Varsayılan Yayıncı",
    creator: metatags?.creator || "Varsayılan Yaratıcı",
    icons: {
      icon: imagePath || metatags?.icon,
    },
    openGraph: {
      title: activeArticle?.title,
      description: activeArticle?.description,
      url: currentFullPathUrl,
      site_name: siteName,
      images: [
        {
          url: imagePath,
          alt: activeArticle?.url || "Makale Resmi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: activeArticle?.title,
      description: activeArticle?.description,
      image: imagePath,
    },
    robots: activeArticle?.isDontFollowByRobots
      ? "noindex, nofollow"
      : "index, follow",
  };
}

export default async function ArticlePage({ params }) {
  let { article } = params;
  let articleData = await getArticle(article);
  let activeArticle = articleData?.article_list?.rows[0] || null;
  if (activeArticle != null) {
    return (
      <>
        {/* <MetaPanel
          title={activeArticle?.title}
          descriptionContent={activeArticle?.description}
          keywordsContent={activeArticle?.meta_keys}
          imagePath={imagePath}
          imageAlt={activeArticle?.url}
        /> */}
        <Ads />
        <ArticlePagePanel article={activeArticle} />
        <ScrollToTopButton showBelow={250} />
      </>
    );
  } else {
    return <NotFoundPage />;
  }
}
