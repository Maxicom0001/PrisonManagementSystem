import { NextRequest } from "next/server";
import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB();

    try {
        const [rows] = await pool.query("SELECT * FROM sentences");

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
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const czas_trwania = searchParams.get("czas_trwania");
        const powod = searchParams.get("powod");
        const id_status = searchParams.get("id_status");
        const id_grupy = searchParams.get("id_grupy");

        const query = `INSERT INTO 'sentences'('id', 'czas_trwania', 'powod', 'id_status', 'id_grupy') VALUES ('${id}','${czas_trwania}','${powod}','${id_status}','${id_grupy}')`;

        const [result] = await pool.execute(query);

        return new Response(JSON.stringify({ success: true, insertedId: (result as any).insertId }), {
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
