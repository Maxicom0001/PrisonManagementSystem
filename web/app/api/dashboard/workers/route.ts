import mysql from "mysql2/promise";
import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB();

    try {
        const [total] = await pool.query("SELECT COUNT(*) AS `total` FROM `workers`");
        const [jobs] = await pool.query("SELECT COUNT(*) AS `jobs` FROM `jobs` WHERE aktywne = true;");

        const response = {
            total: total,
            jobs: jobs,
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
