'use strict'

class UserValidator {

  get rules() {
    return {
      username: 'required',
      email: 'required|email',
      password: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'You must provide an username.',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password'
    }
  }

}

module.exports = UserValidator
