"use server";

// import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import { headers } from "next/headers";
import CardItem from "../../components/reusableComponents/CardItem";
import ArticleCard, {
  ArticleProp,
} from "../../components/reusableComponents/ArticleCard";
// ${process.env.URL}
// const size = 5;
// const orderby = "like_number";

export async function fetchArticle(
  page: number,
  size: number,
  orderby: string,
  search: string,
  isSmallCards: boolean
) {
  let response;
  let responseSize;
  let data;
  const pageSize = page * size;

  if (search) {
    responseSize = await fetch(
      `${process.env.URL}/api/article/list_filter_size?&search=${search}`
    );

    const dataSize = await responseSize.json();
    let listSize = dataSize?.article_list_size?.rows[0]?.count;
    // console.log("listSize: " + listSize);
    // console.log("pageSize: " + pageSize);

    if (listSize >= pageSize) {
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&search=${search}`
      );
      data = await response.json();
    } else if (page == 1) {
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=0&size=${listSize}&search=${search}`
      );
      data = await response.json();
    } else if (listSize % size > 0) {
      let lastPageSize = listSize % size;
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&search=${search}&lastPageSize=${lastPageSize}`
      );
      data = await response.json();
    } else {
      data = null;
    }
  } else {
    responseSize = await fetch(
      `${process.env.URL}/api/article/list_filter_size?&order=${orderby}`
    );

    const dataSize = await responseSize.json();
    let listSize = dataSize?.article_list_size?.rows[0].count;

    if (listSize > pageSize) {
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&order=${orderby}`
      );
      data = await response.json();
    } else if (page == 1) {
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=0&size=${listSize}&order=${orderby}`
      );
      data = await response.json();
    } else if (listSize % size > 0) {
      let lastPageSize = listSize % size;
      response = await fetch(
        `${process.env.URL}/api/article/list_filter?page=${page}&size=${size}&order=${orderby}&lastPageSize=${lastPageSize}`
      );
      data = await response.json();
    } else {
      data = null;
    }
  }

  return data?.article_list?.rows?.map((item: ArticleProp, index: number) => (
    <>
      <CardItem
        key={"CardItem_mainId" + item?.url}
        url={item?.url}
        title={item?.title}
        topics={item?.topics.split(",")}
        create_date={item?.create_date}
        like_number={item?.like_number}
        title_image={item?.title_image}
        body={item?.description}
        is_manuel_page={item?.is_manuel_page}
        isSmallCardStyle
        isManyCardsInRow={isSmallCards}
      />
    </>
  ));
}
