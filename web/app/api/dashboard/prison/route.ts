import mysql from "mysql2/promise";

export async function GET() {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

    try {
        const [avalibleCells] = await pool.query("SELECT SUM(cells.pojemnosc) - COUNT(convicts.id) AS unoccupied_spaces FROM `cells`, `convicts`;");
        const [totalSpace] = await pool.query("SELECT SUM(cells.pojemnosc) AS total_space FROM `cells`;");
        const [buildings] = await pool.query("SELECT COUNT(id) FROM `edifices`");
        const [cellBlocks] = await pool.query("SELECT COUNT(id) FROM `cells`");

        const response = {
            avalibleCells: avalibleCells,
            totalSpace: totalSpace,
            buildings: buildings,
            cellBlocks: cellBlocks,
        };

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        console.error("Error executing query:", err);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } finally {
        await pool.end();
    }
}
