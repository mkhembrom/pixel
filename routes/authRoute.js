import { Router } from "express"
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();


const router = new Router();

router.get('/google', passport.authenticate('google', { scope: ["profile", "email"] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect: process.env.BROWSER_CLIENT_URL, }));

router.get("/login", (req, res) => {
    res.json({ success: false, messgae: "Credential wrong" })
})

router.get("/login/success", (req, res) => {
    res.json({ success: true, messgae: "Successful", user: req.user })
})

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect(process.env.BROWSER_CLIENT_URL);
    });
});


export default router;