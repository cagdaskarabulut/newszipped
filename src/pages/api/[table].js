import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  const {
    method,
    query: { table },
  } = req;

  try {
    switch (method) {
      case "GET":
        const getDataQuery = `SELECT * FROM ${table}`;
        const data = await sql.query(getDataQuery);
        res.status(200).json(data.rows);
        break;
      case "POST":
        const { newData } = req.body;
        const keys = Object.keys(newData);
        const values = Object.values(newData);
        const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

        const insertQuery = `
          INSERT INTO ${table} (${keys.join(", ")})
          VALUES (${placeholders})
          RETURNING *;
        `;
        const insertResult = await sql.query(insertQuery, values);
        res.status(201).json(insertResult.rows[0]);
        break;
      case "PUT":
        const { id, updatedData } = req.body;
        const updateKeys = Object.keys(updatedData);
        const updateValues = Object.values(updatedData);
        const setString = updateKeys
          .map((key, i) => `${key} = $${i + 1}`)
          .join(", ");

        const updateQuery = `
          UPDATE ${table}
          SET ${setString}
          WHERE id = $${updateValues.length + 1}
          RETURNING *;
        `;
        const updateResult = await sql.query(updateQuery, [
          ...updateValues,
          id,
        ]);
        res.status(200).json(updateResult.rows[0]);
        break;
      case "DELETE":
        const { id: deleteId } = req.body;
        const deleteQuery = `
          DELETE FROM ${table}
          WHERE id = $1
          RETURNING *;
        `;
        const deleteResult = await sql.query(deleteQuery, [deleteId]);
        res.status(200).json(deleteResult.rows[0]);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
