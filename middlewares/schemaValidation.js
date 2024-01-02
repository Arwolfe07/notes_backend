const joi = require('joi');

const notesSchema = joi.object({
    title: joi.string().required().min(10).max(50),
    description: joi.string().required().min(0).max(2000)
}).required()

module.exports.validateNotes = (req, res, next) => {
    console.log(req.body.title);
    const { error } = notesSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        return res.status(400).json({ error: msg });
    }
    next();
}