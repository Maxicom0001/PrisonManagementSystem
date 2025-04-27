import { NextRequest } from "next/server";
import connectDB from "@/components/api/connectDB";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const idToCheck = params.id;
    try {
        const [convict] = await pool.query("SELECT * FROM workers WHERE workers.id_budynku = ?", [idToCheck]);

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
