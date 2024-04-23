import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../shemas/user.js';

dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECT)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));

const generateAuthToken = async function(data) {
    try {
        const token = jwt.sign({ data: data }, process.env.JWT_SECRET_KEY);
        return token;
    } catch (error) {
        console.error('Erreur lors de la génération du jeton d\'authentification :', error);
        throw error;
    }
}

const postUserModel = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = new User({
            ...data,
            password: hashedPassword
        });

        await newUser.save();
        console.log('Utilisateur ajouté avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        throw error;
    }
};

const loginModel = async (data) => {
    try {
        const user = await User.findOne({ email: data.email }).exec();

        if (user) {
            const match = await bcrypt.compare(data.password, user.password);

            if (match) {
                const token = await generateAuthToken(user);
                return token;
            } else {
                return null;
            }
        } else {
            return null;
        }

    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        throw error;
    }
};

export {
    generateAuthToken,
    postUserModel,
    loginModel
};