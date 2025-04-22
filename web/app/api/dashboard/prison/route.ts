import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB()

    try {
        const [avalibleCells] = await pool.query("SELECT SUM(cells.pojemnosc) - COUNT(convicts.id) AS unoccupied_spaces FROM `cells`, `convicts`;");
        const [totalSpace] = await pool.query("SELECT SUM(cells.pojemnosc) AS total_space FROM `cells`;");
        const [buildings] = await pool.query("SELECT COUNT(id) FROM `edifices`");
        const [cellBlocks] = await pool.query("SELECT COUNT(id) FROM `cells`");

        const response = {
            avalibleCells: avalibleCells,
            totalSpace: totalSpace,
            buildings: buildings,
            cellBlocks: cellBlocks,
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
    