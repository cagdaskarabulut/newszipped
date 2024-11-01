import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const projectName = process.env.PROJECT_SITE_NAME;

    const values = [
      request.body.fontcolor,
      request.body.headerfontcolor,
      request.body.backgroundcolor,
      request.body.headerbackgroundcolor1,
      request.body.headerbackgroundcolor2,
      request.body.bodycontentbackgroundcolor1,
      request.body.bodycontentbackgroundcolor2,
      request.body.footerbackgroundcolor1,
      request.body.footerbackgroundcolor2,
      request.body.searchbarcolor,
      request.body.mainmenuselectedfontcolor,
      request.body.categorymenuselectedbackgroundcolor,
      request.body.categorymenuselectedfontcolor,
      request.body.orderbymenuselectedfontcolor,
      request.body.tagcolor,
      request.body.commentbuttonfontcolor,
      request.body.commentbuttonbackgroundcolor,
      request.body.commentbuttonbordercolor,
      request.body.loginbuttonfontcolor,
      request.body.loginbuttonbackgroundcolor,
      request.body.loginbuttonbordercolor,
      request.body.errorcolor,
      request.body.cautioncolor,
      projectName, // projectName'i sorgunun son parametresi olarak ekleyin
    ];

    const script = `UPDATE public.article_project_colors
        SET 
        fontcolor=$1,
        headerfontcolor=$2,
        backgroundcolor=$3,
        headerbackgroundcolor1=$4,
        headerbackgroundcolor2=$5,
        bodycontentbackgroundcolor1=$6,
        bodycontentbackgroundcolor2=$7,
        footerbackgroundcolor1=$8,
        footerbackgroundcolor2=$9,
        searchbarcolor=$10,
        mainmenuselectedfontcolor=$11,
        categorymenuselectedbackgroundcolor=$12,
        categorymenuselectedfontcolor=$13,
        orderbymenuselectedfontcolor=$14,
        tagcolor=$15,
        commentbuttonfontcolor=$16,
        commentbuttonbackgroundcolor=$17,
        commentbuttonbordercolor=$18,
        loginbuttonfontcolor=$19,
        loginbuttonbackgroundcolor=$20,
        loginbuttonbordercolor=$21,
        errorcolor=$22,
        cautioncolor=$23
        where project=$24;`;

    let data = await sql.query(script, values);
    return response.status(200).json("successfully saved");
  } catch (error) {
    console.log("error", error);
    return response.status(500).json({ error });
  }
}
