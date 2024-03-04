import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { findUserById } from '../../../services/users.services.js';

const cookieExtractor = (req) => {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'jwt') {
                return value;
            }
        }
    }

    const token = req.cookies ? req.cookies.jwt : null;
    return token
}

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "VeniBarquitoVeni"
}

export const strategyJWT = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await findUserById(payload.user.id);

        if (!user) {
            return done(null, false)
        }

        return done(null, user)

    } catch (error) {
        return done(error, false)
    }
})