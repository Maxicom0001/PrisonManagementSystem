import mysql from "mysql2/promise";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

    const idToCheck = params.id;
    try {
        const [convict] = await pool.query(
            "SELECT cells.id, cells.pojemnosc, edifices.funkcja, cell_types.nazwa FROM `cells` INNER JOIN edifices ON edifices.id = cells.id_budynku INNER JOIN cell_types ON cell_types.id = cells.id_rodzaj WHERE cells.id = ?",
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
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

    const idToDelete = params.id;
    try {
        const [convicts] = await pool.query("SELECT * FROM convicts WHERE id_celi = ?", [idToDelete]);

        if ((convicts as []).length > 0) {
            return new Response(JSON.stringify({ error: "Cannot delete cell: Convicts are assigned to this cell." }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const [result] = await pool.query("DELETE FROM cells WHERE id = ?", [idToDelete]);

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
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

    const idToUpdate = params.id;
    const body = await request.json();

    const { pojemnosc, id_budynku, id_rodzaj } = body;

    const updates = [];
    const values = [];

    if (pojemnosc) {
        updates.push("pojemnosc = ?");
        values.push(pojemnosc);
    }
    if (id_budynku) {
        updates.push("id_budynku = ?");
        values.push(id_budynku);
    }
    if (id_rodzaj) {
        updates.push("id_rodzaj = ?");
        values.push(id_rodzaj);
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
        const sql = `UPDATE cells SET ${updates.join(", ")} WHERE id = ?`;

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
