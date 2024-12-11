import Operation from "../../models/Operation.js";
import User from "../../models/User.js";

export const createUser = async (req, res) => {
    console.log(req.body);
    const { user, email, name } = req.body;
    try {
        const newUser = await User.create({ user, email, name });
        res.json(newUser);
    } catch (error) {
        res.json({ message: error });
    }
};

export const getUserByEmail = async (req, res) => {
    const { email, name } = req.body;
    console.log(req.body);
    try {
        const foundUser = await User.findOne({
            where: {
                email,
            },
        });
        console.log(foundUser);
        if (foundUser) res.json(foundUser);
        else {
            const newUser = await User.create({
                email,
                name,
            });
            res.json(newUser);
        }
    } catch (error) {
        res.json(error);
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const foundUser = await User.findOne({
            where: {
                id,
            },
            include: Operation,
        });
        res.json(foundUser);
    } catch (error) {
        res.json(error);
    }
};

export const getUsers = async (req, res) => {
    try {
        const foundUsers = await User.findOne({
            include: Operation,
        });
        res.json(foundUsers);
    } catch (error) {
        res.json(error);
    }
};
