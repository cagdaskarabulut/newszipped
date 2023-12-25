import { useCallback, useContext, useEffect, useState } from "react";
import useWindowSize from "@rooks/use-window-size";
import MetaPanel from "../components/mainComponents/MetaPanel";
import { MOBILE_SCREEN_SIZE } from "../constants/GeneralConstants";

export default function SkinPage({ article }) {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);

  return (
    <>
      <MetaPanel
        title="title"
        descriptionContent="descriptionContent"
        keywordsContent="keywordsContent"
        imagePath="/images/icon.ico"
        imageAlt="newszipped-article"
      />
      <ArticlePagePanel article={article} />
      <ScrollToTop showBelow={250} />
    </>
  );
}

export async function getStaticProps(ctx) {
  let pageUrl = ctx.params?.article;
  let isPageFound = false;
  const article = await fetch("/api/article-url-list")
    .then((res) => res.json())
    .then((dataList) => {
      dataList?.article_url_list?.rows.map((objectData, index) => {
        //- sayfayı bul
        if (objectData.url.toLowerCase() === pageUrl.toLowerCase()) {
          isPageFound = true;
          //- sayfaya ait nesneyi bul
          fetch("/api/article-findby-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: objectData.url,
            }),
          }) //message
            .then((res) => res.json())
            .then((activeData) => {
              return activeData?.article_findby_url?.rows;
            });
        }
      });
    });

  if (isPageFound) {
    //- sayfaya döndürülecek verileri hazırlayıp, döndür
    try {
      return {
        props: {
          article,
        },
        // revalidate: 10, // Next.js will attempt to re-generate the page: // When a request comes in // At most once every 10 seconds
      };
    } catch {
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  const articleUrlList = await fetch("/api/article-url-list")
    .then((res) => res.json())
    .then((dataList) => {
      dataList?.article_url_list?.rows;
    });
  return {
    paths: articleUrlList.map((objectData) => {
      return {
        params: {
          article: objectData.url,
        },
      };
    }),
    fallback: "blocking",
  };
}
