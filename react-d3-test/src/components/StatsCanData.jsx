import * as d3 from "d3";
import React, {useState, useEffect} from 'react';

const StatsCanData = () => {
    const[data, setData] = useState(null);

    useEffect(() => {
        const apiUrl = 'https://www150.statcan.gc.ca/t1/wds/rest/getFullTableDownloadCSV/14100287/en';

        const fetchData = async () => {
            try {
                const res = await fetch(apiUrl);
                const json = await res.json();

                const csvUrl = json.object;

                const csvData = await d3.csv(csvUrl);
                setData(csvData);
            } catch (error) {
                console.error("Errorr fetching StatsCan data", error);
            }
        }
        fetchData();
    }, {});

    return (
        <div>
            <h2>StatsCan CSV Data</h2>
            {data && (
                <pre style={{ maxHeight: "400px", overflow: "auto", background: "#eee", padding: "1em" }}>
                {JSON.stringify(data.slice(0, 5), null, 2)}
                </pre>
            )}
        </div>
    )
};

export default StatsCanData
// const fetch = async (url) => {
//         const response = await fetch(url);
//         return await response.text();
//     }
//     const csvUrl = "";
//     fetch(csvUrl).then(text => {
//         const data = d3.csvParse(text);
//         let message = '';
//         message = message + data.length + 'rows';
//         document.body.textContent = message;
//         console.log(data.length + 'rows');
//     });

// d3.csv(csvUrl).then(data => {
//         setData(data);
//         let message = '';
//         message = message + data.length;
//         document.getElementById('message-container').textContent = message;
//     })
//     return (
//         <div>StatsCanData {data ? message : 'loading'}</div>
//     );
// };