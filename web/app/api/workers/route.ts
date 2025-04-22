import mysql from "mysql2/promise";
import { NextRequest } from "next/server";
import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB();

    try {
        const [convict] = await pool.query("SELECT * FROM workers");

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

export async function POST(req: NextRequest) {
    const pool = connectDB();

    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const id_zadania = searchParams.get("id_zadania");
        const imie = searchParams.get("imie");
        const nazwisko = searchParams.get("nazwisko");
        const pesel = searchParams.get("pesel");
        const pensja = searchParams.get("pensja");
        const id_budynku = searchParams.get("id_budynku");

        const query = `INSERT INTO 'workers'('id', 'id_zadania', 'imie', 'nazwisko', 'pesel', 'pensja', 'id_budynku') VALUES ('${id}','${id_zadania}','${imie}','${nazwisko}','${pesel}','${pensja}','${id_budynku}')`;

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
