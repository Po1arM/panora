const express = require('express');
const app = express();
const path = require('path');

const lookupCSV = require('lookup-csv')
const lookupTable = lookupCSV('./server/clientes.csv', "Identificacion")
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, '')));

app.get('/:code', (req, res) => {
    const code = req.params.code;
    const cliente = lookupTable.get(code);

    if (cliente) {
        res.json(cliente);
    }
    else {
        res.json({ error: "Cliente no encontrado" });
    }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})