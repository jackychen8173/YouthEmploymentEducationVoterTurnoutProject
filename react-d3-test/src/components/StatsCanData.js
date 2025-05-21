import * as d3 from "d3";
import React, {useState, useCallback} from 'react';

const csvUrl = "https://www150.statcan.gc.ca/t1/wds/rest/getFullTableDownloadCSV/14100287/en";

const StatsCanData = () => {
    const[data, setData] = useState(null);

    d3.csv(csvUrl).then(data => {
        setData(data);
        let message = '';
        message = message + data.length;
        document.getElementById('message-container').textContent = message;
    })
    return (
        <div>StatsCanData {data ? message : 'loading'}</div>
    );
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