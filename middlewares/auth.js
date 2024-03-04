import passport from 'passport';

export const auth = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) {
                return res.status(401).send({
                    status: "error",
                    message: "Hubo un error al auntenticar.",
                    error: error
                });
            }

            if (!user) {
                return res.status(401).send({
                    status: "error",
                    message: "No se a podido autenticar al usuario.",
                });
            }
            req.user = user;
            next();
        })(req, res, next);
    };
};

export const roleValidation = (roles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({
                status: "error",
                message: "Usuario no autorizado"
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).send({
                status: "error",
                message: "No posee los permisos de rol necesarios"
            });
        }
        
        next()
    }
}

export const authOptional = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error || !user) {
                req.user = null;
                return next()
            }
            req.user = user;
            return next();
        })(req, res, next);
    };
};