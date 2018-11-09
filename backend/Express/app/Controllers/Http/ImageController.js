'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const Person = use('App/Models/Person')
const Image = use('App/Models/Image')
const File = use('App/Utils/File')
const Drive = use('Drive')


/**
 * Resourceful controller for interacting with images
 */
class ImageController extends BaseController {

  async index({ params }) {
    return await Person.query()
      .with('images')
      .where(builder => {
        builder.where('id_person', '=', params.id_person)
      })
      .fetch()
  }
  /**
   * Create/save a new image.
   * POST images
   */
  async store({ request, response, params: { id_person } }) {

    const person = await Person.findOrFail(id_person)

    const { data, na_image } = request.post()

    await File.readAndCreateFile(data, na_image)

    delete request.body.data

    request.body = {
      ...request.body,
      id_person: person.id_person
    }

    return super.save(request, response, new Image())
  }

  /**
   * Display a single image.
   * GET images/:id
   */
  async show({ params: { id_person, id }, response }) {
    await Person.findOrFail(id_person)
    const images = await Image.query()
      .where(builder => {
        builder.where('id_person', '=', id_person)
        builder.where('id_image', '=', id)
      })
      .with('person')
      .fetch()
      
    return super.show(response, images)
  }

  /**
  * Delete a image with id.
  * DELETE images/:id
  */
  async destroy({ params: { id_person, id } }) {
    await Person.findOrFail(id_person)
    let image = await Image.query()
      .where(builder => {
        builder.where('id_person', '=', id_person)
        builder.where('id_image', '=', id)
      })
      .fetch()

    this.deleteImage(image)
  }

  async deleteImage(image) {
    if (image) {
      image = image.toJSON()[0]
      const imageName = image.na_image
      if (await Drive.exists(imageName)) {
        await Drive.delete(imageName)
        image = await Image.find(image.id_image)
        image.delete()
      }
    }
  }
}

module.exports = ImageController
