import * as rep from '../repositories/repositories.js'
import jwt from 'jsonwebtoken';

import userModel from '../models/user.model.js'
import { comparePassword, createHash } from '../utils/bcrypt/bcrypt.js';

export const loginJWT = async (email, password) => {

    try {
        const user = await rep.findOneByFilter(userModel, { email: email });

        if (!user) {
            return null;
        }

        if (!comparePassword(password, user.password)) {
            return null;
        }

        const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '3h' });

        const response = {
            token:token,
            user:user
        }

        return response;

    } catch (error) {
        throw error;
    }
}

export const register = async (data) => {
    try {
        const user = await rep.findOneByFilter(userModel, { email: data.email });

        if (user) {
            return null;
        }

        const hashPassword = createHash(data.password);

        const newUser = await rep.createOne(userModel, {
            name: data.name,
            email: data.email,
            whatsapp: data.whatsapp,
            password: hashPassword,
            birthday: data.birthday
        })

        const token = jwt.sign({ user: { id: newUser._id } }, process.env.JWT_SECRET, { expiresIn: '3h' });

        const response = {
            token:token,
            user:newUser
        }

        return response;

    } catch (error) {
        throw error
    }
}