class HandleResponse {

    static success(message, data) {
        return {
            success: true,
            message: message,
            data: data
        }
    }

    static successMessage(message, data, userData, roomData) {
        return {
            success: true,
            message: message,
            data: data,
            userData: userData,
            roomData: roomData
        }
    }

    static loginResponse(message, data) {
        return {
            success: true,
            message: message,
            user: data
        }
    }

    static logicalError(message, data) {
        return {
            success: false,
            message: message,
            data: data
        }
    }

    static listSuccess(message, data) {
        return {
            success: true,
            message: message,
            data: data,
            total: data.length
        }
    }

    static internalError(message, data) {
        return {
            success: false,
            message: message,
            data: data
        }
    }

}

export default HandleResponse;