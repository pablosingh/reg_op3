import Cripto from "../../models/Cripto.js";

export const getCriptos = async (req, res) => {
    try {
        const foundCriptos = await Cripto.findAll({});
        res.json(foundCriptos);
    } catch (error) {
        res.json({ message: error });
    }
};
