import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv";
import passport from 'passport';
// import { PrismaClient } from '@prisma/client'
import Db from "../config/db.js";

const prisma = new Db()

dotenv.config();



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    // passReqToCallback: true
},
    async (accessToken, refreshToken, profile, done) => {
        const user = await prisma.user.findFirst({
            where: {
                googleId: profile?.id,
            }
        });

        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails?.[0]?.value;
        const photo = profile.photos?.[0]?.value;


        if (!user) {

            const newUser = await prisma.user.create({
                data: {
                    googleId,
                    name,
                    email,
                    photo

                },
            });
            console.log("newUser ", newUser)
            done(null, newUser);

        } else {
            done(null, user);
        }

    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });
    done(null, user);
});



export default passport;