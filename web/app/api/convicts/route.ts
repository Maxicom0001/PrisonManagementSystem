import { NextRequest } from "next/server";
import connectDB from "@/components/api/connectDB";

function formatDateToMySQL(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // miesiące są od 0 do 11
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export async function GET(req: NextRequest) {
    const pool = connectDB();

    try {
        const searchParams = req.nextUrl.searchParams;
        const order = searchParams.get("order");
        const type = searchParams.get("type");
        const [rows] = await pool.query(
            `SELECT convicts.id, convicts.imie, convicts.nazwisko, convicts.drugie_imie, convicts.nazwisko_panienskie_matki, convicts.pesel, convicts.miejsce_urodzenia, convicts.data_osadzenia, convicts.id_celi, convicts.data_wyjscia, sentences.czas_trwania AS wyrok, sentences.powod AS powod_wyroku FROM convicts INNER JOIN sentences ON sentences.id = convicts.id_wyroku WHERE data_wyjscia IS NULL ORDER BY ${order == null ? "id" : order} ${type == null ? "asc" : type}`,
        );

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
    const pool = connectDB();
    console.log("POST request received");

    try {
        const body = await req.json();

        const imie = body.firstName;
        const nazwisko = body.lastName;
        const drugie_imie = body.middleName;
        const nazwisko_panienskie_matki = body.mothersMaidenName;
        const pesel = body.pesel
        const miejsce_urodzenia = body.birthplace;
        const data_osadzenia = body.incarcerationDate.split("T")[0]; // Extract the date part from the datetime string
        const id_wyroku = Number(body.sentenceId);
        const id_celi = Number(body.cellId);


        const query = `INSERT INTO convicts (imie, nazwisko, drugie_imie, nazwisko_panienskie_matki, pesel, miejsce_urodzenia, data_osadzenia, id_wyroku, id_celi) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const values = [imie, nazwisko, drugie_imie, nazwisko_panienskie_matki, pesel, miejsce_urodzenia, data_osadzenia, id_wyroku, id_celi];

        console.log("query: ",  query)

        const [result] = await pool.execute(query, values);
        return new Response(JSON.stringify({ success: true, insertedId: (result as any).insertId }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        //console.error("Error executing query:", err);
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
