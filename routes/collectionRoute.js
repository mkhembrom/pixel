import { Router } from "express"
import dotenv from "dotenv";
import Db from "../config/db.js";
import { checkAuthenticated } from "../middleware/authMiddleware.js";
dotenv.config();
const prisma = new Db();

const router = new Router();

router.post("/saveCollection", async (req, res) => {
    const { authorId } = req.body
    await prisma.collection.create({
        data: {
            authorId
        }
    })
});


router.post("/savePhoto", async (req, res) => {
    const { title, description, image, collectionId } = req.body
    const savePhoto = await prisma.photo.create({
        data: {
            title,
            description,
            image,
            collectionId
        }
    })
    res.status(200).json({ savePhoto });

});

router.post("/saveVideo", async (req, res) => {
    const { title, description, video } = req.body
    const saveVideo = await prisma.photo.create({
        data: {
            title,
            description,
            video
        }
    })
});


router.get("/currentCollection", async (req, res) => {
    if (req.user) {
        const collection = await prisma.collection.findUnique({
            where: {
                authorId: req.user?.id
            }
        })
        res.status(200).json(collection);
    }
})

export default router;