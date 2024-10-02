class ApiError extends Error{
    statuscode: number;
    data: object | null;
    message: string;
    success: boolean;
    errors: Array<string>;
    constructor(
        statuscode: number,
        message: string = "Something went wrong",
        errors: Array<string> = [],
        stack = ""
    ){
        super(message)
        this.statuscode = statuscode
        this.message = message
        this.errors = errors
        this.data = null
        this.success = false;

        if (stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ApiError;