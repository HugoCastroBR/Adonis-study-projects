'use strict'


const dateFns = require('date-fns')
const crypto = require('crypto')

const User = use('App/Models/User')
const Mail = use('Mail')

class ResetPasswordController {

    async store({ request, response }) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)
            user.token = crypto.randomBytes(3).toString('hex').toUpperCase()
            user.token_created_at = new Date()
            
            await user.save()

            await Mail.send(
                ['emails.forgot_password'],
                { email, token: user.token, link: `${request.input('redirect_url')}` },
                message => {
                    message
                        .to(user.email)
                        .from('hugoecastro2008@hotmail.com', 'Hugo')
                        .subject('Recuperação de senha')
                }
            )

        } catch (err) {
            return response.status(err.status)
            .send({error:{message: "Algo não deu certo, esse email existe ?"}})
        }
    }

    async update ({request,  response}) {
        console.log("1")
        try {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            const {email,token, password} = request.all()
            const user = await User.findByOrFail('token', token)
            console.log("2")
            if( email === user.email){
                let now = new Date()
                let tokenDate = user.token_created_at
                tokenDate = dateFns.addDays(tokenDate,2)
                console.log("3")
                console.log(now)
                if(dateFns.isAfter(now,tokenDate)){
                    console.log("4")
                    return response.send({error:{message: "Token Vencido"}})
                }
                console.log("5")
                user.token = null
                user.token_created_at = null
                user.password = password
                console.log("6")
                await user.save()
            }
        }catch(err){
            console.log("ad")
            return response.status(err.status)
            .send({error:{message: "Algo não deu certo, esse token existe ?"}})
        }

    }

}

module.exports = ResetPasswordController
