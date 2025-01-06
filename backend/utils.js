function failedRes(msg){
    return {
        success: false,
        message: msg? msg:'Something went wrong'
    }
}

function successRes(msg){
    return {
        success: true,
        message: msg? msg:'Success'
    }
}

module.exports = { failedRes, successRes };