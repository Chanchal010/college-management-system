class ApiResponse {
    statuscode: number;
    data: object | null;
    message: string;
    success: boolean;
    constructor(
        statuscode: number,
        data: object,
        message = "Success",
        success = false
    ){
        this.statuscode = statuscode
        this.data = data
        this.message = message
        this.success = statuscode < 500 ? true : false
    }
}
export default ApiResponse;