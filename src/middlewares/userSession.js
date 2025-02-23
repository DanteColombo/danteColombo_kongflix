const userSession = (req,res,next) => {
    if(req.session.userLogin){
        return next()
    }
    return res.redirect('login')
}

module.exports = userSession