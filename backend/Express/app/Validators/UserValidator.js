'use strict'

class UserValidator {

  get rules() {
    return {
      username: 'required|unique:express.user,username',
      email: 'required|email|unique:express.user,email',
      password: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'Você precisa fornecer um nome de usuário.',
      'username.unique': 'Este nome de usuário já está registrado.',
      'email.required': 'Você precisa fornecer um endereço de email.',
      'email.email': 'Você precisa fornecer um endereço de email válido.',
      'email.unique': 'Este email já está registrado.',
      'password.required': 'Você precisa fornecer uma senha.'
    }
  }

}

module.exports = UserValidator
