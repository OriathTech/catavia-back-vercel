import * as serv from '../services/sessions.services.js';
import * as zod from '../utils/zod/validations.js';
import userSchemaZ from '../utils/zod/schemas/users.js';

export const loginUser = async (req, res, next) => {
    const info = req.body

    try {
        const data = zod.validateNewElement(userSchemaZ, info, ["email", "password"]);

        if (!data.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(data.error.message)
                }
            });
        }

        const email = data.data.email;
        const password = data.data.password;


        const response = await serv.loginJWT(email, password);

        if (!response.token) {
            return res.status(400).json({
                status: "warning",
                message: "Email o contraseña incorrecta.",
                payload: user
            });
        }
        
        res.cookie('jwt', response.token, { httpOnly: false, maxAge: 3 * 60 * 60 * 1000, sameSite: 'None', secure: true });
        return res.status(200).json({
            status: "success",
            message: "Estas logeado.",
            payload: response.user
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Ocurrio un error en el login.",
            error: error.message
        });
    }
}

export const registerUser = async (req, res, next) => {
    const info = req.body;

    try {
        const data = zod.validateNewElement(userSchemaZ, info, ["name", "email", "whatsapp", "password", "birthday"]);

        if (!data.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(data.error.message)
                }
            });
        }

        const response = await serv.register(data.data);

        if (!response.token) {
            return res.status(400).json({
                status: "warning",
                message: "El usuario ya se encuentra registrado."
            });
        }


        res.cookie('jwt', response.token, { httpOnly: false, maxAge: 3 * 60 * 60 * 1000, sameSite: 'None', secure: true });
        return res.status(200).json({
            status: "success",
            message: "Te has registrado correctamente.",
            payload: response.user
        });


    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Ocurrio un error en el registro.",
            error: error.message
        });
    }
}

export const logout = async (req, res, next) => {

    try {
        res.clearCookie('jwt');
        res.status(200).json({
            status: "success",
            message: 'Sesión cerrada exitosamente.'
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Ocurrio un error en el logout.",
            error: error.message
        });
    }
}

export const getSession = async (req, res, next) => {

    const user = req.user;

    try {
        res.status(200).json({
            status: "success",
            message: 'Se ha encontrado la session.',
            payload: user
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Ocurrio un error en el logout.",
            error: error.message
        });
    }
}