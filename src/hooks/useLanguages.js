import { useEffect, useState } from "react";
import { LABELS as LABELS_en } from "../app/enums/lang/en";
import { LABELS as LABELS_tr } from "../app/enums/lang/tr";

const useLanguages = () => {
  const [allSpecialFields, setAllSpecialFields] = useState();

  useEffect(() => {
    const getAllSpecialFields = async () => {
      try {
        const response = await fetch(
          "/api/article/article_project_special_fields"
        );
        const data = await response.json();
        setAllSpecialFields(data?.fields?.rows[0]);
      } catch (error) {
        console.error("Failed to fetch data from the server");
      }
    };
    getAllSpecialFields();
  }, []);

  return allSpecialFields?.default_language === "tr"
    ? LABELS_tr
    : allSpecialFields?.default_language === "en"
    ? LABELS_en
    : "";
};

export default useLanguages;
