import mysql from "mysql2/promise";
import { NextRequest } from "next/server";

export async function GET() {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

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
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });


    try {
        
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')
    const czas_trwania = searchParams.get('czas_trwania')
    const powod = searchParams.get('powod')
    const id_status = searchParams.get('id_status')
    const id_grupy = searchParams.get('id_grupy')

    const query = `INSERT INTO 'sentences'('id', 'czas_trwania', 'powod', 'id_status', 'id_grupy') VALUES ('${id}','${czas_trwania}','${powod}','${id_status}','${id_grupy}')`

    const [result] = await pool.execute(query)

    return new Response(
        JSON.stringify({ success: true, insertedId: (result as any).insertId }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
       
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
