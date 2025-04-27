import connectDB from "@/components/api/connectDB";
import { NextRequest } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const id = params.id; // Assuming you have the id from the request parameters

    try {
        const [rows] = await pool.query(`DELETE FROM \`schedule\` WHERE id = ${id}`);

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

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const id = params.id;

    try {
        const [rows] = await pool.query(`SELECT * FROM \`schedule\` WHERE id = ?`, [id]);

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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const pool = connectDB();

    const id = params.id; // Assuming you have the id from the request parameters

    try {

        const body = await req.json();
        console.log("Request body:", body); // Log the request body for debugging

        const time = body.time;
        const title = body.title;

        const query = `UPDATE \`schedule\` SET time = ?, title = ? WHERE id = ?`;

        console.log("Query:", query);
        console.log("Parameters:", [time, title, id]);

        const [rows] = await pool.query(query, [time, title, id]);

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

