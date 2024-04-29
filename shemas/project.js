import mongoose from 'mongoose';
import Joi from 'joi';

const projectSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: true,
        min: 1,
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    share_link: {
        type: String,
        required: false,
        minlength: 3,
    },
    pages: []
});

const PostProjectJoiSchema = Joi.object({
    id_user: Joi.string().min(1).required(),
    title: Joi.string().min(3).max(50).required(),
    share_link: Joi.string().min(3),
    pages: Joi.array().items(),
});

const PutProjectJoiSchema = Joi.object({
    id_user: Joi.string().min(1),
    title: Joi.string().min(3).max(50),
    share_link: Joi.string().min(3),
    pages: Joi.array().items(),
});

const Project = mongoose.model('Project', projectSchema);

export { 
    Project,
    PostProjectJoiSchema,
    PutProjectJoiSchema,
    projectSchema
};
