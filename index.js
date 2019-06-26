const express = require('express');


const app = express();

app.set('view engine', 'ejs');

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('./data.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
    });

app.get('/', (req, res) => {
    const data = quantile(results);
    res.render('pages/index', {
        data: data
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running');
});

function quantile(results) {
    results.sort((a, b) => (a.gpa > b.gpa) ? 1 : ((b.gpa > a.gpa) ? -1 : 0));
    const len = results.length;
    results.forEach((ele, index) => {
        percentileRank = ((index + 1) / len) * 100;
        results[index].percentileRank = percentileRank;
    });
    return results;
}

