import connectDB from "@/components/api/connectDB";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = connectDB()

    const id = params.id;

    try {
        const [rows] = await pool.query(`SELECT notes.id, notes.content, notes.created_at FROM notes  JOIN convicts ON convicts.id = notes.convict_id WHERE convicts.id = ${id}`);

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