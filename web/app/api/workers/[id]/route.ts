import { NextRequest } from "next/server";
import connectDB from "@/components/api/connectDB";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const idToCheck = params.id;
    try {
        const [convict] = await pool.query("SELECT * FROM workers WHERE id = ?", [idToCheck]);

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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const idToDelete = params.id;
    try {
        const [result] = await pool.query("DELETE FROM workers WHERE id = ?", [idToDelete]);

        return new Response(JSON.stringify(result), {
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const idToUpdate = params.id;
    const body = await request.json();

    const { id_zadania, imie, nazwisko, pesel, pensja, id_budynku } = body;

    const updates = [];
    const values = [];

    if (id_zadania) {
        updates.push("id_zadania = ?");
        values.push(id_zadania);
    }
    if (imie) {
        updates.push("imie = ?");
        values.push(imie);
    }
    if (nazwisko) {
        updates.push("nazwisko = ?");
        values.push(nazwisko);
    }
    if (pesel) {
        updates.push("pesel = ?");
        values.push(pesel);
    }
    if (pensja) {
        updates.push("pensja = ?");
        values.push(pensja);
    }
    if (id_budynku) {
        updates.push("id_budynku = ?");
        values.push(id_budynku);
    }

    if (updates.length === 0) {
        return new Response(JSON.stringify({ error: "No fields to update" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    values.push(idToUpdate);

    try {
        const sql = `UPDATE workers SET ${updates.join(", ")} WHERE id = ?`;

        await pool.query(sql, values);

        return new Response(JSON.stringify({ message: "Convict updated successfully" }), {
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
