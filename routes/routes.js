import { Router } from "express"
import { auth } from "../controllers/auth.js"
import { validarJWT} from "../middlewares/jwt.js"
import { check } from "express-validator"
import { usersHelpers } from "../helpers/usersHelpers.js"
import { validarCampos } from "../middlewares/validarCampos.js"

const router = new Router

router.get('/login', [
    validarJWT,
    check('email').isEmail(),
    check('email').custom(usersHelpers.validarUsuario),
    check('password').custom(usersHelpers.validarPassword),
    validarCampos
], auth.login)
router.post('/register', [
], auth.register)
router.get('/dashboard', auth.dashboard)

export default router;
