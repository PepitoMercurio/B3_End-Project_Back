import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwtVerify from './middlewares/jwtVerrify.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur l\' API</h1>');
});

app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});