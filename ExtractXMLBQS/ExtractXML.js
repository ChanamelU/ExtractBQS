// index.js
const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');

const app = express();
const port = 10000;

app.use(bodyParser.text({ type: 'text/xml' }));

app.post('/extract', (req, res) => {
  console.log(req)
    const xml = req.body;
    
    // Parse the XML
    const parser = new xml2js.Parser();
    parser.parseString(xml, (err, result) => {
        if (err) {
            return res.status(400).send('Invalid XML');
        }

        // Extract the parcellabelsPDF data
        try {
            const parcellabelsPDF = result['soap:Envelope']['soap:Body'][0]['storeOrdersResponse'][0]['orderResult'][0]['parcellabelsPDF'][0];
            res.send(parcellabelsPDF);
        } catch (e) {
            res.status(500).send('Error extracting parcellabelsPDF');
        }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

