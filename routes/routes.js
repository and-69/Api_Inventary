import { Router } from "express"
import { auth } from "../controllers/auth.js"
import { validarJWT} from "../middlewares/jwt.js"
import { check } from "express-validator"
import { usersHelpers } from "../helpers/usersHelpers.js"
import { validarCampos } from "../middlewares/validarCampos.js"
import { peticiones } from "../controllers/peticiones.js"

const router = new Router

router.post('/login', [
    check('email').isEmail(),
    check('email').custom(usersHelpers.validarUsuario),
    check('password').custom(usersHelpers.validarPassword),
    validarCampos
], auth.login)

router.post('/register', [
    check('username','El nombre de usuario es obligatorio').notEmpty(),
    check('email','Debe ser un email válido').isEmail(),
    check('email').custom(usersHelpers.validarEmail),
    check('password','Minimo 8 caracteres').isLength({min:8}),
    validarCampos
], auth.register)

router.get('/dashboard', [
    validarJWT,

    validarCampos
],auth.dashboard)

router.post('/agregarProducto',[
    
],peticiones.agregarProducto)

export default router;
