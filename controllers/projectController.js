import { generateShareLink, getProjectByIDModel, getProjectsModel, getProjectsByUserModel, postProjectModel, updateProjectModel, deleteProjectModel } from '../models/projectModel.js';
import { PostProjectJoiSchema, PutProjectJoiSchema } from '../shemas/project.js';

const getProjectByIDController = async (req, res) => {
    if (req.params.id === undefined) {
        return res.status(400).send('ID invalide');
    }
    try {
        const project = await getProjectByIDModel(req.params.id);
        res.status(200).send(project);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération du projet');
    }
}

const getProjectsController = async (req, res) => {
    try {
        const projects = await getProjectsModel();
        res.status(200).send(projects);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des projets');
    }
}

const getProjectsByUserController = async (req, res) => {
    if (req.params.id_user === undefined) {
        return res.status(400).send('ID invalide');
    }
    try {
        const projects = await getProjectsByUserModel(req.params.id_user);
        res.status(200).send(projects);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des projets');
    }
}

const postProjectController = async (req, res) => {
    const share_link = generateShareLink();
    req.body.share_link = share_link;
    const { error } = PostProjectJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        await postProjectModel(req.body);
        res.status(200).send({
            message: 'Projet ajouté avec succès',
        });
    } catch (err) {
        res.status(500).send('Erreur lors de l\'ajout du projet');
    }
}

const updateProjectController = async (req, res) => {
    const { error } = PutProjectJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        await updateProjectModel(req.params.id, req.body);
        res.status(200).send({
            message: 'Projet mis à jour avec succès',
        });
    } catch (err) {
        res.status(500).send('Erreur lors de la mise à jour du projet');
    }
}

const deleteProjectController = async (req, res) => {
    if (req.params.id === undefined) {
        return res.status(400).send('ID invalide');
    }
    try {
        await deleteProjectModel(req.params.id);
        res.status(200).send({
            message: 'Projet supprimé avec succès',
        });
    } catch (err) {
        res.status(500).send('Erreur lors de la suppression du projet');
    }
}

export {
    getProjectByIDController,
    getProjectsController,
    getProjectsByUserController,
    postProjectController,
    updateProjectController,
    deleteProjectController
}