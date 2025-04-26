import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB();

    async function queryOne<T>(sql: string): Promise<T> {
        const [rows] = (await pool.query(sql)) as [T[], any];
        return rows[0];
    }

    interface TotalWorkers {
        total: number;
    }

    interface TotalJobs {
        jobs: number;
    }

    try {
        const total = await queryOne<TotalWorkers>("SELECT COUNT(*) AS `total` FROM `workers`");
        const jobs = await queryOne<TotalJobs>("SELECT COUNT(*) AS `jobs` FROM `jobs` WHERE aktywne = true;");

        const response = {
            workers: {
                total: total.total,
                jobs: jobs.jobs,
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
