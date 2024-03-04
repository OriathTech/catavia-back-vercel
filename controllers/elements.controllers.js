import * as serv from "../services/elements.services.js";
import * as zod from "../utils/zod/validations.js"
import elementSchemaZ from "../utils/zod/schemas/elements.js";

export const getElements = async (req, res, next) => {
    try {
        const response = await serv.findElements();

        return res.status(200).json({
            status: "success",
            message: "Se han encontrado los elementos.",
            payload: response
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo encontrar los elementos.",
            error: error.message
        });
    }
}

export const postElement = async (req, res, next) => {
    const info = req.body;
    console.log(info)

    try {
        const data = zod.validateNewElement(elementSchemaZ, info, ["name"])

        console.log("ZOD:", data)

        if (!data.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(data.error.message)
                }
            });
        }

        const elements = await serv.createElement(data.data);

        return res.status(200).json({
            status: "success",
            message: "El elemento ha sido creado.",
            payload: elements
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo crear el elemento.",
            error: error.message
        });
    }
}

export const putElement = async (req, res, next) => {
    const eid = req.params.eid;
    const info = req.body;

    try {
        const elementId = zod.validateId(eid);

        if (!elementId.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(elementId.error.message)
                }
            });
        }

        const data = zod.validateElement(elementSchemaZ, info);

        console.log("validacion:", JSON.stringify(data.error))

        if (!data.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(data.error.message)
                }
            });
        }
        const response = await serv.updateElementById(elementId.data, data.data);

        return res.status(200).json({
            status: "success",
            message: "El elemento ha sido actualizado.",
            payload: response.payload,
            reload: response.reload
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo actualizar el elemento.",
            error: error.message
        });
    }
}

export const deleteElement = async (req, res, next) => {
    const eid = req.params.eid;

    try {
        const elementId = zod.validateId(eid);

        if (!elementId.success) {
            return res.status(422).json({
                status: "error",
                message: "Error de validación",
                errors: {
                    message: JSON.parse(elementId.error.message)
                }
            });
        }

        const response = await serv.deleteElementById(elementId.data);

        if (response.status === "warning") {
            return res.status(200).json({
                status: "warning",
                message: "No se pudo eliminar el elemento, se encuentra en uno o más productos.",
                payload: response.payload
            });
        };

        return res.status(200).json({
            status: "success",
            message: "El elemento ha sido eliminado.",
            payload: response
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "No se pudo eliminar el elemento.",
            error: error.message
        });
    }
}