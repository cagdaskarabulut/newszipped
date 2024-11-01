import { useEffect, useState } from "react";

const useProjectSpecialFields = () => {
  const [allSpecialFields, setAllSpecialFields] = useState();

  useEffect(() => {
    const getAllSpecialFields = async () => {
      try {
        fetch("/api/article/article_project_special_fields")
          .then((res) => res.json())
          .then((data) => {
            setAllSpecialFields(data?.fields?.rows[0]);
          });
      } catch (error) {
        toast.error("Failed to fetch data from the server");
      }
    };
    getAllSpecialFields();
  }, []);
  return allSpecialFields;
};

export default useProjectSpecialFields;
