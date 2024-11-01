import { useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "../constants/GeneralConstants";
import useWindowSize from "@rooks/use-window-size";

// Commercial class for creating the commercial objects
class Commercial {
  constructor(image, mobileImage, link, alt) {
    this.image = image;
    this.mobileImage = mobileImage;
    this.link = link;
    this.alt = alt;
  }
}

const useCommercials = () => {
  const { innerWidth } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [commercials, setCommercials] = useState([]);

  const linkCommercialForUs = [
    "https://fas.st/5sT0J", //admitad
    "https://fas.st/5sT0J", //admitad
    "https://fas.st/5sT0J", //admitad
    "https://fas.st/5sT0J", //admitad
  ];

  const altCommercialForUs = ["admitad", "admitad", "admitad", "admitad"];

  const imageCommercialForUs = [
    "/images/admitad.jpeg",
    "/images/admitad.jpeg",
    "/images/admitad.jpeg",
    "/images/admitad.jpeg",
  ];

  const mobileImageCommercialForUs = [
    "/images/admitad-horizontal.webp",
    "/images/admitad-horizontal.webp",
    "/images/admitad-horizontal.webp",
    "/images/admitad-horizontal.webp",
  ];

  const linkCommercialForRussia = [
    "https://fas.st/5sT0J", //admitad
    "https://fas.st/5sT0J", //admitad
    "https://fas.st/5sT0J", //admitad
    "https://fas.st/5sT0J", //admitad
  ];

  const altCommercialForRussia = ["admitad", "admitad", "admitad", "admitad"];

  const imageCommercialForRussia = [
    "/images/admitad.jpeg",
    "/images/admitad.jpeg",
    "/images/admitad.jpeg",
    "/images/admitad.jpeg",
  ];

  const mobileImageCommercialForRussia = [
    "/images/admitad-horizontal.webp",
    "/images/admitad-horizontal.webp",
    "/images/admitad-horizontal.webp",
    "/images/admitad-horizontal.webp",
  ];

  // Handle screen size changes
  useEffect(() => {
    if (innerWidth === null) {
      setIsMobile(false);
    } else {
      setIsMobile(innerWidth < MOBILE_SCREEN_SIZE);
    }
  }, [innerWidth]);

  // Handle language and commercials data
  useEffect(() => {
    const userLanguage = navigator.language || navigator.userLanguage;

    let commercialsList = [];

    if (userLanguage.includes("ru")) {
      commercialsList = [
        new Commercial(
          imageCommercialForRussia[0],
          mobileImageCommercialForRussia[0],
          linkCommercialForRussia[0],
          altCommercialForRussia[0]
        ),
        new Commercial(
          imageCommercialForRussia[1],
          mobileImageCommercialForRussia[1],
          linkCommercialForRussia[1],
          altCommercialForRussia[1]
        ),
        new Commercial(
          imageCommercialForRussia[2],
          mobileImageCommercialForRussia[2],
          linkCommercialForRussia[2],
          altCommercialForRussia[2]
        ),
        new Commercial(
          imageCommercialForRussia[3],
          mobileImageCommercialForRussia[3],
          linkCommercialForRussia[3],
          altCommercialForRussia[3]
        ),
      ];
    } else {
      commercialsList = [
        new Commercial(
          imageCommercialForUs[0],
          mobileImageCommercialForUs[0],
          linkCommercialForUs[0],
          altCommercialForUs[0]
        ),
        new Commercial(
          imageCommercialForUs[1],
          mobileImageCommercialForUs[1],
          linkCommercialForUs[1],
          altCommercialForUs[1]
        ),
        new Commercial(
          imageCommercialForUs[2],
          mobileImageCommercialForUs[2],
          linkCommercialForUs[2],
          altCommercialForUs[2]
        ),
        new Commercial(
          imageCommercialForUs[3],
          mobileImageCommercialForUs[3],
          linkCommercialForUs[3],
          altCommercialForUs[3]
        ),
      ];
    }

    setCommercials(commercialsList);
  }, []);

  return { commercials, isMobile };
};

export default useCommercials;
