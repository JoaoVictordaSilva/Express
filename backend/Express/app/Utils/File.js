const Drive = use('Drive')

class File {

    static async readAndCreateFile(data, imageName) {
        await Drive.put(`${imageName}`, Buffer.from(data, 'base64'))
    }

    static async readAndReturnFile(imageName) {
        if (await Drive.exists(imageName)) {
            return await Drive.get(imageName, 'base64')
        }
        return ''
    }

    async getFile() {
        if (await Drive.exists('teste.png')) {
            let result = await Drive.get('teste.png')
            result = Buffer.from(result.toString('base64'), 'base64')
            Drive.put('testando 23.png', result)
        }
    }

}

module.exports = File
