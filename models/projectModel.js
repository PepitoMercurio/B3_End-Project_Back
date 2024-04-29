import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project } from '../shemas/project.js';

dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECT)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));

const getProjectByIDModel = async (id) => {
    try {
        const project = await Project.findById(id).exec();
        return project;
    } catch (error) {
        console.error('Erreur lors de la récupération du projet :', error);
        throw error;
    }
}

const getProjectsModel = async () => {
    try {
        const projects = await Project.find().exec();
        return projects;
    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        throw error;
    }
}

const getProjectsByUserModel = async (id_user) => {
    try {
        const projects = await Project.find({ id_user }).exec();
        return projects;
    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        throw error;
    }
}

const postProjectModel = async (data) => {
    try {
        const newProject = new Project(data);
        await newProject.save();
        console.log('Projet ajouté avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'ajout du projet :', error);
        throw error;
    }
};

const updateProjectModel = async (id, data) => {
    try {
        await Project.findByIdAndUpdate(id, data).exec();
        console.log('Projet mis à jour avec succès !');
    } catch (error) {
        console.error('Erreur lors de la mise à jour du projet :', error);
        throw error;
    }
};

const deleteProjectModel = async (id) => {
    try {
        await Project.findByIdAndDelete(id).exec();
        console.log('Projet supprimé avec succès !');
    } catch (error) {
        console.error('Erreur lors de la suppression du projet :', error);
        throw error;
    }
};

export {
    getProjectByIDModel,
    getProjectsModel,
    getProjectsByUserModel,
    postProjectModel,
    updateProjectModel,
    deleteProjectModel
};