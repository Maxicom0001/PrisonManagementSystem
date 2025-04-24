import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB()

    interface avalibleCells { unoccupied_spaces: number };
    interface totalSpace { total_space: number };
    interface buildings { buildings: number };
    interface cellBlocks { cellBlocks: number }; 

    async function queryOne<T>(sql: string): Promise<T> {
        const [rows] = await pool.query(sql) as [T[], any];
        return rows[0];
    }

    try {
        const avalibleCells = await queryOne<avalibleCells>("SELECT (SELECT SUM(cells.pojemnosc) FROM cells) - COUNT(convicts.id) as unoccupied_spaces FROM convicts WHERE convicts.data_wyjscia IS NULL");
        const totalSpace = await queryOne<totalSpace>("SELECT SUM(cells.pojemnosc) AS total_space FROM `cells`;");
        const buildings = await queryOne<buildings>("SELECT COUNT(id) AS buildings FROM `edifices`");
        const cellBlocks = await queryOne<cellBlocks>("SELECT COUNT(id) as cellBlocks FROM `cells`");

        const response = {
            prison: {
                availbleCells: avalibleCells.unoccupied_spaces,
                totalSpace: totalSpace.total_space,
                buildings: buildings.buildings,
                cellBlocks: cellBlocks.cellBlocks,
            }
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
    