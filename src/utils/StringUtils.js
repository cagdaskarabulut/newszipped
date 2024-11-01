export const replaceStringForUrlFormat = (myString) => {
  myString = myString.replace(/ /g, "-");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.replace(/ó/g, "o");
  myString = myString.replace(/,/g, "");
  myString = myString.replace(/:/g, "");
  myString = myString.replace("?", "");
  myString = myString.toLowerCase();
  return myString;
};

export const capitalizeFirstChar = (myString) => {
  return myString.charAt(0).toUpperCase() + myString.slice(1);
};

// export const getStringWithCommaSeperatedFromList = (myStringList) => {
//   let result = "";
//   for (let index = 0; index < myStringList.length; index++) {
//     const activeName = myStringList[index].name;
//     if (index == 0) {
//       result = activeName;
//     } else {
//       result = result + "," + activeName;
//     }
//   }
//   return "," + result + ",";
// };

export const getStringWithCommaSeperatedFromList = (list) => {
  if (!Array.isArray(list)) {
    return "";
  }
  return "," + list.map((item) => item.name).join(",") + ",";
};

// export const getListFromStringWithCommaSeperated = (myString) => {
//   let result = [];
//   let myList = myString.split(",");
//   for (let index = 0; index < myList.length; index++) {
//     if (myList[index] && myList[index].length > 0 && myList[index] !== ",") {
//       result = [...result, myList[index]];
//     }
//   }
//   return result;
// };

export const getListFromStringWithCommaSeperated = (myString) => {
  let result = [];
  let myList = myString.split(",");
  for (let index = 0; index < myList.length; index++) {
    if (myList[index] && myList[index].trim().length > 0) {
      result = [...result, myList[index].trim()];
    }
  }
  return result;
};
