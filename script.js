async function fetchResults() {
    console.log("Funkce fetchResults byla volána.");
    const query = document.getElementById('searchQuery').value;
    if (!query) {
        alert('Prosím, zadejte klíčové slovo.');
        return;
    }

    const apiUrl = `https://api.serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=f9bbfa2d69361eb39c7bd9ebe7a7083df45b307ab49d6c4a1fcdf0473e555cb6&hl=cs`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Chyba při získávání dat z API");
        }
        const data = await response.json();

        const results = data.organic_results.map(result => ({
            title: result.title,
            link: result.link,
            snippet: result.snippet
        }));

        document.getElementById('results').textContent = JSON.stringify(results, null, 2);

        downloadJSON(results, 'results.json');
    } catch (error) {
        console.error("Došlo k chybě:", error);
    }
}

function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
