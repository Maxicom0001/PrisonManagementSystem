import { NextRequest } from "next/server";
import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB();

    try {
        const [convict] = await pool.query(
            "SELECT workers.id, workers.imie, workers.nazwisko, workers.pesel, workers.pensja, workers.id_zadania, workers.id_budynku, jobs.nazwa as zadanie FROM workers JOIN jobs ON workers.id_zadania = jobs.id",
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

export async function POST(req: NextRequest) {
    const pool = connectDB();

    try {
        const body = await req.json();

        const id_zadania = body.jobId;
        const imie = body.firstName;
        const nazwisko = body.lastName;
        const pesel = body.pesel;
        const pensja = body.pensja;
        const id_budynku = body.buildingId;

        const query = `INSERT INTO workers (id_zadania, imie, nazwisko, pesel, pensja, id_budynku)
                       VALUES (?, ?, ?, ?, ?, ?);`;

        const values = [id_zadania, imie, nazwisko, pesel, pensja, id_budynku];

        const [result] = await pool.execute(query, values);

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

export async function PATCH(req: NextRequest) {
    const pool = connectDB();

    try {
        const body = await req.json();

        const id = body.id;
        const id_zadania = body.jobId;
        const imie = body.firstName;
        const nazwisko = body.lastName;
        const pesel = body.pesel;
        const pensja = body.pensja;
        const id_budynku = body.buildingId;

        const query = `UPDATE workers SET id_zadania = ?, imie = ?, nazwisko = ?, pesel = ?, pensja = ?, id_budynku = ? WHERE id = ?;`;
        const values = [id_zadania, imie, nazwisko, pesel, pensja, id_budynku, id];

        const [result] = await pool.execute(query, values);

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
