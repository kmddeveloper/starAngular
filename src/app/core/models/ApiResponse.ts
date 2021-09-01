export class ApiResponse<T>{
    statusCode:Number;
    error:Error;
    result:T;
}