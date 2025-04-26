import { NextRequest } from "next/server";
import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB();

    try {
        const [rows] = await pool.query("SELECT * FROM `groups`");

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
        const nazwa_grupy = searchParams.get("nazwa_grupy");
        const id_ograniczenia = searchParams.get("id_ograniczenia");

        const query = `INSERT INTO 'groups'('id', 'nazwa_grupy', 'id_ograniczenia') VALUES ('${id}','${nazwa_grupy}','${id_ograniczenia}')`;

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
