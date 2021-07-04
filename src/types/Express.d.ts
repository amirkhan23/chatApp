declare namespace Express
{
    interface ApiOk
    {
        message:string,
        data:any
    }

    interface ApiResponse
    {
        status?: number,
        message: string,
        data: any | null,
        extraErrorData?: any | null,
    }
}