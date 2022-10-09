import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'vocales'
})
export class VocalesPipe implements PipeTransform {

   transform(value: string): string {
      let newString = value.replace(/a/gi,'@');
      newString = newString.replace(/e/gi, '3');
      newString = newString.replace(/i/gi, '1');
      newString = newString.replace(/o/gi, 'O');
      newString = newString.replace(/u/gi, '5');
      return newString;
   }
}
