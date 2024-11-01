import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./ImageViewerManuel.module.scss";
//- Örnek olarak yapılmıştır. Pages klasörü altına eklenirse çalışacaktır.

const ImageViewerManuel = ({
  imageName,
  imagePath,
  onClickAction,
  isSmallSize,
}) => {
  return (
    <>
      <div className={isSmallSize ? styles.smallSize : styles.standartSize}>
        <Image
          src={imagePath}
          alt={"img_" + imageName}
          key={"img_" + imageName}
          onClick={onClickAction}
          fill
          objectFit="contain"
        />
      </div>
    </>
  );
};

export default ImageViewerManuel;
