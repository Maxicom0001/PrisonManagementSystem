import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB()

    try {
        const [totalActive] = await pool.query("SELECT COUNT(*) FROM jobs WHERE aktywne = true;");
        const [completed] = await pool.query("SELECT COUNT(*) FROM jobs WHERE aktywne = false;");

        const response = {
            totalActive: totalActive,
            completed: completed,
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
