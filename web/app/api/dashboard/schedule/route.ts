import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB();

    async function queryAll<T>(sql: string): Promise<T[]> {
        const [rows] = (await pool.query(sql)) as [T[], any];
        return rows;
    }

    interface schedule {
        time: string;
        activity: string;
        status: string;
    }

    try {
        const schedule = await queryAll<schedule>("SELECT schedule.time, title from `schedule` ORDER BY time ASC");

        const response = {
            schedule: schedule,
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
