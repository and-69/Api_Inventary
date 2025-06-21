import{ Router} from "express"
import {login,register,dashboard} from "../controllers/auth.js"
const router=new Router

router.get('/login',login)
router.post('/register',register)
router.get('/dashboard',dashboard)
export default router;
