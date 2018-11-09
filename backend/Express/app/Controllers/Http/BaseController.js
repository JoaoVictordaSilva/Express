'use strict'

class BaseController {

    async save(request, response, model) {

        const body = request.post();

        model.$attributes = {
            ...body
        }

        await model.save();

        this.response(response, 'Registro incluído', model)
    }

    async update(request, response, staticModel, id) {

        const body = request.post()

        const model = await staticModel.find(id)

        model.$attributes = {
            ...model.$attributes,
            ...body
        }

        await model.save()

        this.response(response, 'Registro atualizado', model)

    }

    async delete(staticModel, id) {
        const model = await staticModel.find(id)
        model.delete();
    }

    show(response, data) {
        if (data.rows.length === 0) {
            return response.status(204).json()
        }
        return data
    }

    response(response, message, model, status = 200) {
        return response.status(status).json({
            message,
            data: model.toJSON()
        })
    }

}

module.exports = BaseController
