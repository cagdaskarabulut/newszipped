"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

import { fetchArticle } from "../../app/pagination/pagination_article";

let page = 2;

export type ArticleCard = JSX.Element;

function LoadMore({
  orderType,
  search,
  totalListSize,
  pageSize,
  isSmallCards,
}) {
  let rowForPage = pageSize;
  const { ref, inView } = useInView();

  const [data, setData] = useState<ArticleCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    page = 2;
    setIsFinished(false);
    setData([]);
    setIsLoading(false);
  }, [orderType, search]);

  useEffect(() => {
    // console.log("useEffect geldi ");

    if (inView && !isFinished) {
      // console.log("inView geldi ");
      setIsLoading(true);
      const delay = 200;
      const timeoutId = setTimeout(async () => {
        if (totalListSize < page * rowForPage) {
          setIsFinished(true);
        }

        fetchArticle(page, rowForPage, orderType, search, isSmallCards).then(
          (res) => {
            if (res) {
              // console.log("res geldi ");
              setData([...data, ...res]);
              page++;
            } else {
              // console.log("res null geldi ");
              setIsFinished(true);
            }
            setIsLoading(false);
          }
        );

        // if (totalListSize < page * rowForPage) {
        //   // const remainingList = totalListSize - (page - 1) * rowForPage;
        //   fetchArticle(page, rowForPage, orderType, search, isSmallCards).then(
        //     (res) => {
        //       if (res) {
        //         console.log("res geldi ");
        //         setData([...data, ...res]);
        //         page++;
        //       } else {
        //         console.log("res null geldi ");
        //         setIsFinished(true);
        //       }
        //       setIsLoading(false);
        //     }
        //   );
        //   setIsFinished(true);
        // } else {
        //   console.log(
        //     "else e geldi => totalListSize >= page * rowForPage geldi "
        //   );
        //   fetchArticle(page, rowForPage, orderType, search, isSmallCards).then(
        //     (res) => {
        //       if (res) {
        //         console.log("res geldi ");
        //         setData([...data, ...res]);
        //         page++;
        //       } else {
        //         console.log("res null geldi ");
        //         setIsFinished(true);
        //       }
        //       setIsLoading(false);
        //     }
        //   );
        // }
      }, delay);
      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
    setIsLoading(false);
  }, [inView, data, isLoading]);

  return (
    <>
      <section
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {data}
      </section>
      <br />
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <section>
          <br />
          <div
            ref={ref}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            {inView && isLoading && !isFinished && (
              <>
                <Image
                  src="./spinner.svg"
                  alt="spinner"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </>
            )}
          </div>
        </section>
      </div>
      <style jsx global>{`
        body {
          background-color: #f2f2f2;
        }
      `}</style>
    </>
  );
}

export default LoadMore;
