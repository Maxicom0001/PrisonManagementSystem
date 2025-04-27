const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function deleteData(url: string, data: Object): Promise<any> {
    const randomDelay = Math.floor(Math.random() * 1000) + 500; // Random delay between 500ms and 1500ms
    console.log("randomDelay:", randomDelay);
    await delay(randomDelay); // Simulate network delay
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json", // informujemy serwer, że wysyłamy JSON
        },
        body: JSON.stringify(data), // dane w formacie JSON
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return await response.json();
}
