export class ApiResponse<T>{
    statusCode:Number;
    apiError:Error;
    result:T;
}