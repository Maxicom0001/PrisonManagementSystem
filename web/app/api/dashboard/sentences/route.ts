import mysql from "mysql2/promise";

export async function GET() {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

    try {
        const [longest] = await pool.query(
            "SELECT convicts.id AS `convicts_id` , sentences.czas_trwania, sentences.powod FROM `convicts` JOIN sentences ON convicts.id_wyroku = sentences.id ORDER BY sentences.czas_trwania DESC LIMIT 1;",
        );
        const [shortest] = await pool.query(
            "SELECT convicts.id AS `convicts_id` , sentences.czas_trwania, sentences.powod FROM `convicts` JOIN sentences ON convicts.id_wyroku = sentences.id ORDER BY sentences.czas_trwania ASC LIMIT 1;",
        );
        const [newest] = await pool.query(
            "SELECT convicts.id AS `convicts_id` , sentences.czas_trwania, sentences.powod FROM `convicts` JOIN sentences ON convicts.id_wyroku = sentences.id ORDER BY convicts.data_osadzenia DESC LIMIT 1;",
        );

        const response = {
            longest: longest,
            shortest: shortest,
            newest: newest,
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
