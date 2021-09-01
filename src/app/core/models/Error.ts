
export class Error{

   type:String;
   message:String;
   stackTrace:String;


   constructor(type:String, message:String, stackTrace:String){
        this.type=type;
        this.message=message;
        this.stackTrace=stackTrace;
   }
}