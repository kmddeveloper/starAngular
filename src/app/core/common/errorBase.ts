export class errorBase {

    error:String | undefined;

    resetError(){
        this.error="";
    }
    
    setErrorMessage(message){
    if (!this.error || this.error.length==0 )
        this.error= message;
    }

    setHttpErrorMessage(httpError:any){

        if (httpError){

            if (httpError.error){

                if (httpError.error.apiError){
                    this.error = httpError.error.apiError.message;
                }
                else if (httpError.error.message){
                    this.error = httpError.error.message;
                }
                else{
                    this.error = httpError.error;
                }
            }
            else{
                if (httpError.message){
                    this.error = httpError.message;        
                }
                else{
                    this.error = httpError.error;       
                }
            }
        }
    }
}