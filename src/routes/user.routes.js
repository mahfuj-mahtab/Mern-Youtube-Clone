import { Router } from "express";
import { userRegister,userLogin,userLogout } from "../controllers/user.controllers.js"
import {upload} from '../middlewares/multer.middleware.js'
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()
router.route('/register').post(
    upload.fields([
        {name : 'avatar',
            maxCount: 1
        },
        {name : 'coverImage',
            maxCount: 1
        },
    ]),
    userRegister)
router.route('/login').post(userLogin)

//secure routes

router.route("/logout").post(verifyJWT, userLogout)

export default router