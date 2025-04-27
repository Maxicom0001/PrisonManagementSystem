import connectDB from "@/components/api/connectDB";
import { NextRequest } from "next/server";

export async function GET() {
    const pool = connectDB();

    try {
        const [rows] = await pool.query("SELECT * FROM `schedule` ORDER BY time ASC");

        return new Response(JSON.stringify(rows), {
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

export async function POST(req: NextRequest) {
    const pool = connectDB();

    try {

        const body = await req.json();
        console.log("Request body:", body); // Log the request body for debugging

        const time = body.time;
        const title = body.title;

        const query = `INSERT INTO \`schedule\` (time, title) VALUES (?, ?)`;

        console.log("Query:", query);
        console.log("Parameters:", [time, title]);

        const [rows] = await pool.query(query, [time, title]);

        return new Response(JSON.stringify(rows), {
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
