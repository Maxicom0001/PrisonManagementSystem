import mysql from "mysql2/promise";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST || "127.0.0.1",
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD || "",
        database: process.env.MYSQL_DATABASE || "jail",
    });

    const idToCheck = params.id;
    try {
        const [convict] = await pool.query(
            "SELECT convicts.id, convicts.imie, convicts.drugie_imie, convicts.nazwisko, convicts.nazwisko_panienskie_matki, convicts.pesel, convicts.miejsce_urodzenia, convicts.data_osadzenia, sentences.czas_trwania, sentences.powod, cells.id, convicts.id_celi, cell_types.nazwa, edifices.adres FROM `convicts` INNER JOIN sentences ON sentences.id = convicts.id_wyroku INNER JOIN cells ON cells.id = convicts.id_celi INNER JOIN edifices ON edifices.id = cells.id_budynku INNER JOIN cell_types ON cell_types.id = cells.id_rodzaj WHERE convicts.id_celi = ?",
            [idToCheck],
        );

        return new Response(JSON.stringify(convict), {
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
