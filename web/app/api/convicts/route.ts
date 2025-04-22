import { NextRequest } from "next/server";
import connectDB from "@/components/api/connectDB";

export async function GET(req: NextRequest) {
    const pool = connectDB()

    try {
        const searchParams = req.nextUrl.searchParams
        const order = searchParams.get('order')
        const type = searchParams.get('type') 
        const [rows] = await pool.query(`SELECT convicts.id, convicts.imie, convicts.nazwisko, convicts.drugie_imie, convicts.nazwisko_panienskie_matki, convicts.pesel, convicts.miejsce_urodzenia, convicts.data_osadzenia, convicts.id_celi, convicts.data_wyjscia, sentences.czas_trwania AS wyrok, sentences.powod AS powod_wyroku FROM convicts INNER JOIN sentences ON sentences.id = convicts.id_wyroku WHERE data_wyjscia IS NULL ORDER BY ${order} ${type}`);

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

export async function POST(req: NextRequest) {
    const pool = connectDB()

    try {
        
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')
    const imie = searchParams.get('imie')
    const nazwisko = searchParams.get('nazwisko')
    const drugie_imie = searchParams.get('drugie_imie')
    const nazwisko_panienskie_matki = searchParams.get('nazwisko_panienskie_matki')
    const pesel = searchParams.get('pesel')
    const miejsce_urodzenia = searchParams.get('miejsce_urodzenia')
    const data_osadzenia = searchParams.get('data_osadzenia')
    const id_wyroku = searchParams.get('id_wyroku')
    const id_celi = searchParams.get('id_celi')

    const query = `INSERT INTO 'convicts'('id', 'imie', 'nazwisko', 'drugie_imie', 'nazwisko_panienskie_matki', 'pesel', 'miejsce_urodzenia', 'data_osadzenia', 'id_wyroku', 'id_celi') VALUES ('${id}','${imie}','${nazwisko}','${drugie_imie}','${nazwisko_panienskie_matki}','${pesel}','${miejsce_urodzenia}','${data_osadzenia}','${id_wyroku}','${id_celi}')`

    const [result] = await pool.execute(query)

    return new Response(
        JSON.stringify({ success: true, insertedId: (result as any).insertId }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
       
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
