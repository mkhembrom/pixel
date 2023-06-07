import express from "express";
// import session from "express-session";
import cors from "cors";
// import { default as connectMongoDBSession } from 'connect-mongodb-session';


// import auth from "./routes/authRoute.js";
// import collection from "./routes/collectionRoute.js";
import dotenv from "dotenv";
// import passport from "./lib/googleAuthentication.js";
// import { checkAuthenticated } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// const MongoDBStore = connectMongoDBSession(session);

// const store = new MongoDBStore({
//     uri: process.env.DATABASE_URL,
//     collection: 'sessions'
// });


app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, DELETE, PATCH, PUT",
    credentials: true
}));
app.use(express.json());
// app.use(
//     session({
//         secret: process.env.SECRET,
//         resave: false,
//         saveUninitialized: false,
//         cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 1 },
//         store: store
//     })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/auth", auth);
// app.use("/collection", collection);

app.get("/", (req, res) => {
    res.json({ success: true, page: "Home Page" });
})

// app.get("/profile", checkAuthenticated, (req, res) => {
//     res.json({ success: true, user: req.user });
// })

app.listen(8080, () => {
    console.log("server is running at PORT 8080")
})