import connectDB from "@/components/api/connectDB";

export async function GET() {
    const pool = connectDB();

    interface CountRow { total: number }
    interface Convict {
        id: string;
        imie: string;
        nazwisko: string;
        data_osadzenia: string;
    }
    interface NextReleaseRow {
        id: string;
        imie: string;
        data_osadzenia: string;
        new_date: string;
    }
    interface TotalCellsRow { totalCells: number }

    async function queryOne<T>(sql: string): Promise<T> {
        const [rows] = await pool.query(sql) as [T[], any];
        return rows[0];
    }

    try {
        const total = await queryOne<CountRow>("SELECT COUNT(*) AS total FROM convicts WHERE data_wyjscia IS NULL");
        const newest = await queryOne<Convict>("SELECT id, data_osadzenia, imie, nazwisko FROM convicts ORDER BY data_osadzenia DESC LIMIT 1");
        const oldest = await queryOne<Convict>("SELECT id, data_osadzenia, imie, nazwisko FROM convicts ORDER BY data_osadzenia ASC LIMIT 1");
        const nextRelease = await queryOne<NextReleaseRow>("SELECT convicts.id, imie, data_osadzenia, DATE_ADD(data_osadzenia, INTERVAL sentences.czas_trwania DAY) AS new_date FROM convicts JOIN sentences ON convicts.id_wyroku = sentences.id ORDER BY new_date ASC LIMIT 1");
        const totalCells = await queryOne<TotalCellsRow>("SELECT SUM(pojemnosc) AS totalCells FROM cells");
                

        const response = {
            prisoners: {
                totalCells: totalCells.totalCells,
                total: total.total,
                newest,
                oldest: {
                    ...oldest,
                    years: new Date().getFullYear() - new Date(oldest.data_osadzenia).getFullYear(),
                },
                nextRelease,
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
