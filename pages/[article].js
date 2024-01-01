import { useCallback, useContext, useEffect, useState } from "react";
import useWindowSize from "@rooks/use-window-size";
import MetaPanel from "../components/mainComponents/MetaPanel";
import { MOBILE_SCREEN_SIZE } from "../constants/GeneralConstants";
import ArticlePagePanel from "../components/pageComponents/ArticlePagePanel";
import ScrollToTopButton from "../components/reusableComponents/ScrollToTopButton";

// export default function ArticlePage({ article, articleSummary }) {
export default function ArticlePage({ article }) {
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
      <ScrollToTopButton showBelow={250} />

      <style jsx global>{`
        body {
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps(ctx) {
  let pageUrl = ctx.params?.article;
  let isPageFound = false;
  let article;
  let articleSummary;
  try {
    await fetch(process.env.URL + "/api/article_list", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((dataList) => {
        dataList?.article_list?.rows.map((objectData, index) => {
          //- sayfayı bul
          if (objectData.url.toLowerCase() === pageUrl.toLowerCase()) {
            isPageFound = true;
            // articleSummary = objectData;
            article = objectData;
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
      } catch (err) {
        console.log(err);
        return {
          notFound: true,
        };
      }
    } else {
      return {
        notFound: true,
      };
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getStaticPaths() {
  const articleSummaryUrlList = await fetch(
    process.env.URL + "/api/article_url_list",
    { method: "GET" }
  )
    .then((res) => res.json())
    .then((dataList) => {
      return dataList?.article_url_list?.rows;
    });
  return {
    paths: articleSummaryUrlList.map((objectData) => {
      return {
        params: {
          article: objectData.url,
        },
      };
    }),
    fallback: "blocking",
  };
}
