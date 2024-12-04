import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"

import multer from "multer"

const foodRouter = express.Router();

//Image storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})//bt this we can store the images in the upload folder

foodRouter.post("/add", upload.single("image"),addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);



export default foodRouter;