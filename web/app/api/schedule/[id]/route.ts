import connectDB from "@/components/api/connectDB";

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

    const id = params.id; // Assuming you have the id from the request parameters

    try {
        const [rows] = await pool.query(`SELECT * FROM \`schedule\` WHERE id = ${id}`);

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