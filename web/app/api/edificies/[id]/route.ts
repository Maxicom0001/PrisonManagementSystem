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
        const [convict] = await pool.query("SELECT * FROM edifices WHERE id = ?", [idToCheck]);

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
        const [workers] = await pool.query("SELECT * FROM workers WHERE id_budynku = ?", [idToDelete]);

        if ((workers as []).length > 0) {
            return new Response(JSON.stringify({ error: "Cannot delete building: workers are assigned to it." }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const [result] = await pool.query("DELETE FROM edifices WHERE id = ?", [idToDelete]);

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
