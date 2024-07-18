// index.js
const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');

const app = express();
app.use(bodyParser.text({ type: 'application/xml' }));

function extractTagContents(xmlData, tagName) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const content = result.item[tagName][0];
        resolve(content);
      }
    });
  });
}

app.post('/', async (req, res) => {
  const tagName = req.query.tag;
  const xmlData = req.body;

  try {
    const content = await extractTagContents(xmlData, tagName);
    res.type('text/plain').status(200).send(content);
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Node.js server is running on port ${PORT}`);
});
