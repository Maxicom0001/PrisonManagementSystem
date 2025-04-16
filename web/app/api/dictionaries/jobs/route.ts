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
        const [jobs] = await pool.query("SELECT * FROM `jobs`;");

        const response = {
            jobs: jobs
        };

        return new Response(JSON.stringify(response), {
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
    const nazwa = searchParams.get('nazwa')
    const aktywne = searchParams.get('aktywne')


    const query = `INSERT INTO 'jobs'('id', 'nazwa', 'aktywne') VALUES ('${id}','${nazwa}','${aktywne}')`

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
