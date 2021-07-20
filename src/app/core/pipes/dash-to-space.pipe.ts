//ng g pipe core/pipes/dashToSpace
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashToSpace'
})
export class DashToSpacePipe implements PipeTransform {

 // transform(value: unknown, ...args: unknown[]): unknown {
  ///  return null;
 // }

  transform(value: string,  character:string): string {    
    return value? value.replace(character, ' '): value;
  }


}
