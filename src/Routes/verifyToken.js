const jwt = require('jsonwebtoken')

const auth = (req ,res ,next) => { 
    const authHeader =  req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];

        jwt.verify(token,process.env.JWT_SEC,(err,user) => {
            if(err) res.status(403).send('invalid token !')
            req.user = user
            next()
        })
    }else{
        return res.status(401).json('not authinticated !')
    }
}

const authRules = (req,res,next) => {
    auth(req ,res , () => {
        if(req.user.isAdmin){
        next()}
        else{
            res.status(403).send('you are not allowed !')
        }
    })
}

module.exports = {auth , authRules} 