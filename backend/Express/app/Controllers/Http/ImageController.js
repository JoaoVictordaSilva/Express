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
  async store({ request, response }) {


    const { data, na_image } = request.post()

    await File.readAndCreateFile(data, na_image)

    delete request.body.data

    return super.save(request, response, new Image())
  }

  /**
   * Display a single image.
   * GET images/:id
   */
  async show({ params: { id_person, id }, response }) {
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
  async destroy({ response, params: { id_person, id } }) {
    let image = await Image.query()
      .where(builder => {
        builder.where('id_person', '=', id_person)
        builder.where('id_image', '=', id)
      })
      .fetch()

    return this.deleteImage(response, image)
  }

  async deleteImage(response, image) {
    if (image) {
      image = image.toJSON()[0]
      const imageName = image.na_image
      if (await Drive.exists(imageName)) {
        await Drive.delete(imageName)
        return super.delete(response, Image, image.id_image)
      }
    } 
  }
}

module.exports = ImageController
