import mysql from "mysql2/promise";

export async function GET() {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

    try {
        const [total] = await pool.query("SELECT COUNT(*) AS `total` FROM `convicts`");
        const [newest] = await pool.query("SELECT id, data_osadzenia, imie, nazwisko FROM `convicts` ORDER BY data_osadzenia ASC LIMIT 1;");
        const [nextRelease] = await pool.query(
            "SELECT DATE_ADD(data_osadzenia, INTERVAL sentences.czas_trwania DAY) AS new_date FROM `convicts` JOIN sentences ON convicts.id_wyroku = sentences.id ORDER BY new_date ASC LIMIT 1;",
        );
        const [oldest] = await pool.query("SELECT id, data_osadzenia, imie, nazwisko FROM `convicts` ORDER BY data_osadzenia DESC LIMIT 1;");

        const response = {
            total: total,
            newest: newest,
            nextRelease: nextRelease,
            oldest: oldest,
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
