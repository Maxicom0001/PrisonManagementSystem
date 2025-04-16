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
        const [convict] = await pool.query(
            "SELECT cells.id, cells.pojemnosc, edifices.funkcja, cell_types.nazwa FROM `cells` INNER JOIN edifices ON edifices.id = cells.id_budynku INNER JOIN cell_types ON cell_types.id = cells.id_rodzaj;",
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
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });


    try {
        
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')
    const pojemnosc = searchParams.get('pojemnosc')
    const id_budynku = searchParams.get('id_budynku')
    const id_rodzaj = searchParams.get('id_rodzaj')

    const query = `INSERT INTO 'cells'('id', 'pojemnosc', 'id_budynku', 'id_rodzaj') VALUES ('${id}','${pojemnosc}','${id_budynku}','${id_rodzaj}')`

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