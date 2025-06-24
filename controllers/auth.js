import Users from "../models/user.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/jwt.js";

const auth = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const holder = await Users.findOne({ email });
            
            const token = await generarJWT(holder._id);
            res.header('Authorization', token);
            res.json({
                holder: {
                    _id: holder._id,
                    username: holder.username,
                    email: holder.email,
                    token: token
                }
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
    register: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const holder = new Users({ username, email, password });
            const salt = bcryptjs.genSaltSync();
            holder.password = bcryptjs.hashSync(password, salt);
            await holder.save();

            const token = await generarJWT(holder._id);
            res.setHeader('Authorization', token);
            res.status(201).json({
                holder: {
                    _id: holder._id,
                    username: holder.username,
                    email: holder.email,
                    token: token
                },
                msg: "Holder registrado correctamente",
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster",
                error: error.message
            })
        }
    },

    dashboard: async (req, res) => {
        const { email, password } = req.body;
        try {
            const usuario = await Users.findOne({ email })
            if (!usuario) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }
            if (usuario.estado === 0) {
                return res.status(400).json({
                    msg: "Holder Inactivo"
                })
            }
            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }
            const token = await generarJWT(usuario.id);
            res.json({
                usuario,
                token
            })
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    }
}

export { auth };