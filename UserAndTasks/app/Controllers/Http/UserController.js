'use strict'

const User = use('App/Models/User')


class UserController {

    async store ({request, response}) {
        const data = request.only(['username','password','email'])
        
        const user = await User.create(data)
        return user
        
        
    }

    async update ({request,response,params}) {
        const user = await User.findOrFail(params.id)
        const data = request.only(['username','about','number','number2','twitter','facebook'])
        user.merge(data)
        await user.save()
        return user
    }



}

module.exports = UserController
