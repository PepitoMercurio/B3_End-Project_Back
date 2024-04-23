import { postUserModel, loginModel } from '../models/userModel.js';
import { userRegistrationJoiSchema, userLoginJoiSchema } from '../shemas/user.js';

const postUserController = async (req, res) => {
    const { error } = userRegistrationJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        await postUserModel(req.body);
        res.status(200).send({
            message: 'Données ajoutées avec succès',
        });
    } catch (err) {
        res.status(500).send('Erreur lors de l\'écriture du fichier');
    }
}

const loginController = async (req, res) => {
    console.log(req.body);
    const { error } = userLoginJoiSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const token = await loginModel(req.body);

        console.log(token);

        if (!token) {
            return res.status(401).send('Invalid user or password');
        }

        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.setHeader('Authorization', token);
        res.status(200).send({
            message: 'Login successful',
        });
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    }
}

export { postUserController, loginController };