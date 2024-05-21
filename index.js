import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwtVerify from './middlewares/jwtVerrify.js';
import { postUserController, loginController } from './controllers/userController.js';
import { getProjectsController, getProjectByIDController, getProjectsByUserController, postProjectController, updateProjectController, deleteProjectController } from './controllers/projectController.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur l\' API</h1>');
});

app.post('/register', postUserController);
app.post('/login', loginController);

app.get('/projects', jwtVerify, getProjectsController);
app.get('/projects/:id', jwtVerify, getProjectByIDController);
app.get('/projects/user/:id_user', jwtVerify, getProjectsByUserController);
app.post('/projects', jwtVerify, postProjectController);
app.put('/projects/:id', jwtVerify, updateProjectController);
app.delete('/projects/:id', jwtVerify, deleteProjectController);

app.listen(3001, () => {
    console.log('Serveur démarré sur le port 3001');
});