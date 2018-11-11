'use strict'

class BaseController {

    async save(request, response, model) {

        const body = request.post();

        model.$attributes = {
            ...body
        }

        await model.save();

        this.success(response, 'Registro incluído', model)
    }

    async update(request, response, staticModel, id) {

        const body = request.post()

        const model = await staticModel.find(id)

        model.$attributes = {
            ...model.$attributes,
            ...body
        }

        await model.save()

        this.success(response, 'Registro atualizado', model)

    }

    async delete(response, staticModel, id) {
        const model = await staticModel.find(id)
        model.delete();
        return response.status(200)
    }

    show(response, data) { 
        if (data.rows.length === 0) {
            return this.notFount(response)
        }
        return data
    }

    success(response, message, model, status = 200) {
        return response.status(status).json({
            message,
            data: model.toJSON()
        })
    }

    notFount(response) {
        return response.status(204).json()
    }

}

module.exports = BaseController
