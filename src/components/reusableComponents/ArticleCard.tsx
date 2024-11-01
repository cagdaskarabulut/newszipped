import Image from "next/image";

import { MotionDiv } from "../toolComponents/Motion";


const stagger = 0.25;


const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};


export interface ArticleProp {
  id: string;
  url: string;
  title: string;
  topics: string;
  create_date: string;
  title_image: string;
  body: string;
  is_manuel_page: string;
  description: string;
  meta_keys: string;
  like_number: string;
  view_number: string;
  comment_number: string;
}

interface Prop {
  article: ArticleProp;
  index: number;
}

function ArticleCard({ article, index }: Prop) {
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * stagger,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded relative w-full"
    >
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-xl line-clamp-1 w-full">
            {article.title}
          </h2>
          <div className="py-1 px-2 bg-[#161921] rounded-sm">
            <p className="text-sm font-bold capitalize">
              {article.url}
            </p>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
  
}

export default ArticleCard;
