import Users from "../models/user.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/jwt.js";

const login = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Datos no proporcionados' });
        }
        const { email = '', password = '' } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }
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
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const usuario = new Users({ username, email, password });
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);
        await usuario.save();
        const token = await generarJWT(usuario.id);
        res.status(201).json({
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Hable con el WebMaster"
        })
    }
}
const dashboard = async (req, res) => {
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
export { login, register, dashboard };