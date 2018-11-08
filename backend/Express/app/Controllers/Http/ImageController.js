'use strict'

const BaseController = use('App/Controllers/Http/BaseController')
const Person = use('App/Models/Person')
const Image = use('App/Models/Image')
const Address = use('App/Models/Address')
const Drive = use('Drive')


/**
 * Resourceful controller for interacting with images
 */
class ImageController extends BaseController {

  async index({ }) {
    return await Image.query()
      .with('person')
      .fetch()
  }
  /**
   * Create/save a new image.
   * POST images
   */
  async store({ request, response, params: { id_person } }) {

    const person = await Person.findOrFail(id_person)

    const { data, na_image } = request.post()

    await this.readAndCreateFile(data, na_image)

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
  async show({ params: { id_person, id } }) {
    await Person.findOrFail(id_person)
    this.getFile();
    return await Image.query()
      .where(builder => {
        builder.where('id_person', '=', id_person)
        builder.where('id_image', '=', id)
      })
      .with('person')
      .fetch()
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

  async readAndCreateFile(data, imageName) {
    await Drive.put(`${imageName}`, Buffer.from(data, 'base64'))
  }

  //Test example
  async getFile() {
    if (await Drive.exists('teste.png')) {
      let result = await Drive.get('teste.png')
      result = Buffer.from(result.toString('base64'), 'base64')
      Drive.put('testando 23.png', result)
    }
  }

  async deleteImage(image) {
    if (image) {
      image = image.toJSON()[0]
      const imageName = image.na_image
      if (await Drive.exists(imageName)) {
        await Drive.delete(imageName)
        await Image.find(image.id_image).delete()
      }
    }
  }
}

module.exports = ImageController
