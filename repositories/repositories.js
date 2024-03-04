export const findAll = async (model, filter) => {
    try {
        const documents = await model.find(filter);
        return documents;
    } catch (error) {
        throw error;
    }
}
export const findOneById = async (model, id) => {
    try {
        return await model.findById(id);
    } catch (error) {
        throw error
    }
}

export const findOneByFilter = async (model, filter) => {
    try {
        return await model.findOne(filter)
    } catch (error) {
        throw error
    }
}

export const createOne = async (model, info) => {
    try {
        return await model.create(info)
    } catch (error) {
        throw error
    }
}

export const deleteOneById = async (model, id) => {
    try {
        return await model.findByIdAndDelete(id);
    } catch (error) {
        throw error
    }
}

export const updateOneById = async (model, id, info) => {
    try {
        return await model.findByIdAndUpdate(id, info, { new: true });
    } catch (error) {
        throw error
    }
}

export const updateManyByFilter = async (model, filter, info) => {
    try {
        return await model.updateMany(filter, info, { new: true });
    } catch (error) {
        throw error;
    }
}