const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function fetchData(url: string): Promise<any> {
    await delay(2000); // Simulate network delay
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  }