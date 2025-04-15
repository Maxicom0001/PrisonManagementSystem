import mysql from "mysql2/promise";

export async function GET() {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

    try {
        const [statuses] = await pool.query("SELECT * FROM `statuses`;");

        const response = {
            statuses: statuses
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


/**export async function POST(request: Request){
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

    try {
        const body = await request.json();
        const { status } = body as { status?: string }; // type-safe access

        if (!status) {
            return new Response(JSON.stringify({ error: "Missing 'status' field" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }

        const [insertId] = await pool.query(
            "INSERT INTO `statuses` (`status`) VALUES (?);",
            [status]
        );

        return new Response(JSON.stringify({
            message: "Status inserted successfully",
            insertId: insertId,
        }), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        console.error("Error inserting data:", err);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } finally{
        await pool.end()
    }
}**/
