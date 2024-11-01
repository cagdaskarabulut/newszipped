"use server";

// import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import { headers } from "next/headers";
import ArticleCard, {
  ArticleProp,
} from "../../components/reusableComponents/ArticleCard";
// ${process.env.URL}
// const size = 5;
// const orderby = "like_number";

export async function fetchArticleSize(
  page: number,
  size: number,
  orderby: string,
  search: string
) {
  let responseSize;
  const pageSize = page * size;
  let listSize = 0;

  if (search) {
    responseSize = await fetch(
      `${process.env.URL}/api/article/list_filter_size?&search=${search}`
    );
    const dataSize = await responseSize.json();
    listSize = dataSize?.article_list_size?.rows[0]?.count;
  } else {
    responseSize = await fetch(
      `${process.env.URL}/api/article/list_filter_size?&order=${orderby}`
    );
    const dataSize = await responseSize.json();
    listSize = dataSize?.article_list_size?.rows[0].count;
  }

  return listSize;
}
