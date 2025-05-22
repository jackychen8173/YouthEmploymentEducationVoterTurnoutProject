import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/statscan", async (req, res) => {
    try {
        const apiUrl = "https://www150.statcan.gc.ca/t1/wds/rest/getFullTableDownloadCSV/14100287/en";
        const apiResponse = await fetch(apiUrl);
        const json = await apiResponse.json();

        const csvUrl = json.object;
        const csvRes = await fetch(csvUrl);
        const csvText = await csvRes.text();

        res.type("text/csv");
        res.send(csvText);
    } catch (error) {
        console.error("Error fetching StatsCan data: ", error.message);
        res.status(500).json({error: "Failed to fetch StatsCan data"})
    }
})

app.listen(PORT, () => {
    console.log("PRoxy server is running at http://localhost:${PORT}");
})