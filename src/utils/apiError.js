
class ApiError extends Error{
    constructor(
        statuscode,
        message = "something went wrong!!!",
        errors = [],
        stack = ""
    ){
        super(message)
        this.message = message
        this.statuscode = statuscode
        console.log("ApiError Data: ",this.data )
        this.data = null
        this.success = false
        this.errors = errors
        
        if (stack){
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}