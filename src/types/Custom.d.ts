declare namespace NodeJS {
    interface Global {
        rejector(reject: Function, status: number, message?: string, errorDetails?: any): void
    }
    interface ApiResponseType {
        data: any,
        status?: number,
        message: string,
        extraError?: any,
        extraMessage?: any
    }


    interface ApiErrorType {
        status: number,
        message?: string,
        extraError?: any
    }

    interface ApiError {
        status: number,
        error: string
    }

    interface ApiResponse {
        status: number,
        message: string,
        data: any | null,
        extraError: string | null
    }
}