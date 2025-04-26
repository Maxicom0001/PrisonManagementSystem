import connectDB from "@/components/api/connectDB";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const idToCheck = params.id;
    try {
        const [convict] = await pool.query(
            `
                SELECT CASE
                           WHEN COUNT(c.id_celi) < ce.pojemnosc THEN FALSE
                           ELSE TRUE
                           END AS isEmpty
                FROM cells ce
                         LEFT JOIN convicts c ON ce.id = c.id_celi
                WHERE ce.id = ?
                GROUP BY ce.id, ce.pojemnosc
            `,
            [idToCheck],
        );

        return new Response(JSON.stringify(convict), {
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
