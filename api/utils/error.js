// here we are creating a errorHandler to make a custom StatusCode for the error

export const errorHandler = (statusCode, message) => {
    const error = new Error()
    error.message = message
    error.statusCode = statusCode;
    return error;
}