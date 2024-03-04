import passport from 'passport';
import { findUserById } from '../../services/users.services.js'
import { strategyJWT } from './strategies/jwt.js';

export const initializePassport = () => {
    passport.use('jwt', strategyJWT)

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        const user = await findUserById(id);
        done(null, user)
    })
}