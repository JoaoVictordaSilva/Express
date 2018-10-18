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

    response(response, message, model) {
        return response.status(200).json({
            message,
            data: model.toJSON()
        })
    }


}

module.exports = BaseController
