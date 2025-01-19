import { Router } from "express";
import { userRegister,userLogin } from "../controllers/user.controllers.js"

const router = Router()
router.route('/register').post(userRegister)
router.route('/login').get(userLogin)

export default router