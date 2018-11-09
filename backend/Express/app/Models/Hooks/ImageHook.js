'use strict'
const File = use('App/Utils/File')

const ImageHook = exports = module.exports = {}

ImageHook.data = async images => {
    for (const image of images) {
        image.data = await File.readAndReturnFile(image.na_image)
    }
}
