import Joi from "@hapi/joi";
import { categories } from "../types/Category";

export const submitBody = Joi.object({
    category: Joi.string().valid(...Object.keys(categories)).required(),
    subCategory: Joi.string().valid(...new Set(...Object.values(categories).flat())).required(),
    time: Joi.number().required(),
    evidence: Joi.string().required(),
    username: Joi.string()
});
