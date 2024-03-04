import dotenv from 'dotenv'
import express from "express";
import session from 'express-session';
import cors from 'cors';
import corsOptions from "./config/cors/cors.js";
import connectionMongoose from "./config/mongoDB/mongoDB.js";
import router from './routes/index.routes.js'
import passport from 'passport';
import { initializePassport } from './config/passport/passport.js';

dotenv.config()
const PORT = process.env.PORT || 8080;
const app = express();


app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

connectionMongoose();

app.use('/', router)

const server = app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})