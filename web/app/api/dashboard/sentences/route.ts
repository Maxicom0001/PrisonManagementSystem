import mysql from "mysql2/promise";
import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB();

    async function queryOne<T>(sql: string): Promise<T> {
        const [rows] = await pool.query(sql) as [T[], any];
        return rows[0];
    }

    interface longestSentence { convicts_id: number, czas_trwania: string, powod: string };
    interface shortestSentence { convicts_id: number, czas_trwania: string, powod: string };        
    interface newestSentence { convicts_id: number, czas_trwania: string, powod: string };

    try {
        const longest = await queryOne<longestSentence>(
            "SELECT convicts.id AS `convicts_id` , sentences.czas_trwania, sentences.powod FROM `convicts` JOIN sentences ON convicts.id_wyroku = sentences.id ORDER BY sentences.czas_trwania DESC LIMIT 1;",
        );
        const shortest = await queryOne<shortestSentence>(
            "SELECT convicts.id AS `convicts_id` , sentences.czas_trwania, sentences.powod FROM `convicts` JOIN sentences ON convicts.id_wyroku = sentences.id ORDER BY sentences.czas_trwania ASC LIMIT 1;",
        );
        const newest = await queryOne<newestSentence>(
            "SELECT convicts.id AS `convicts_id` , sentences.czas_trwania, sentences.powod FROM `convicts` JOIN sentences ON convicts.id_wyroku = sentences.id ORDER BY convicts.data_osadzenia DESC LIMIT 1;",
        );

        const totalActive = await queryOne<{ totalActive: number }>(
            "SELECT COUNT(*) AS totalActive FROM `convicts` WHERE `data_wyjscia` IS NULL;");

        const completed = await queryOne<{ completed: number }>(
            "SELECT COUNT(*) AS completed FROM `convicts` WHERE `data_wyjscia` IS NOT NULL;");

        const response = {
            sentences: {
                longest: {
                    id: longest.convicts_id,
                    time: longest.czas_trwania,
                    reason: longest.powod,
                },
                shortest: {
                    id: shortest.convicts_id,
                    time: shortest.czas_trwania,
                    reason: shortest.powod,
                },
                newest: {
                    id: newest.convicts_id,
                    time: newest.czas_trwania,
                    reason: newest.powod,
                },
                completed: completed.completed,
                totalActive: totalActive.totalActive,
            },
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
