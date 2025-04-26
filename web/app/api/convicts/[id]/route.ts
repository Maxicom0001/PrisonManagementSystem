import { NextRequest } from "next/server";
import connectDB from "@/components/api/connectDB";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const idToCheck = params.id;
    try {
        const [convict] = await pool.query("SELECT * FROM convicts WHERE id = ?", [idToCheck]);

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
        const [convict] = await pool.query("DELETE FROM convicts WHERE id = ?", [idToDelete]);

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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const idToUpdate = params.id;
    const body = await request.json();

    const { imie, nazwisko, drugie_imie, nazwisko_panienskie_matki, pesel, miejsce_urodzenia, data_osadzenia, id_wyroku, id_celi } = body;

    const updates = [];
    const values = [];

    if (imie) {
        updates.push("imie = ?");
        values.push(imie);
    }
    if (nazwisko) {
        updates.push("nazwisko = ?");
        values.push(nazwisko);
    }
    if (drugie_imie) {
        updates.push("drugie_imie = ?");
        values.push(drugie_imie);
    }
    if (nazwisko_panienskie_matki) {
        updates.push("nazwisko_panienskie_matki = ?");
        values.push(nazwisko_panienskie_matki);
    }
    if (pesel) {
        updates.push("pesel = ?");
        values.push(pesel);
    }
    if (miejsce_urodzenia) {
        updates.push("miejsce_urodzenia = ?");
        values.push(miejsce_urodzenia);
    }
    if (data_osadzenia) {
        updates.push("data_osadzenia = ?");
        values.push(data_osadzenia);
    }
    if (id_wyroku) {
        updates.push("id_wyroku = ?");
        values.push(id_wyroku);
    }
    if (id_celi) {
        updates.push("id_celi = ?");
        values.push(id_celi);
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
        const sql = `UPDATE convicts SET ${updates.join(", ")} WHERE id = ?`;

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
