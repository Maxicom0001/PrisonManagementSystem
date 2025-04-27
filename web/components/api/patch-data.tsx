const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export default async function patchData(url: string, data: Record<string, any>): Promise<any> {
    const randomDelay = Math.floor(Math.random() * 1000) + 500; // Losowe opóźnienie między 500ms a 1500ms
    console.log("randomDelay:", randomDelay);
    await delay(randomDelay); // Symulacja opóźnienia sieciowego

    const response = await fetch(url, {
        method: "PATCH", // Używamy metody PATCH
        headers: {
            "Content-Type": "application/json", // Informujemy serwer, że wysyłamy JSON
        },
        body: JSON.stringify(data), // Wysyłamy dane w formacie JSON
    });

    if (!response.ok) {
        // Obsługa błędów
        throw new Error(`Błąd odpowiedzi sieciowej: ${response.statusText}`);
    }

    // Zwracamy odpowiedź w formacie JSON
    return await response.json();
}
