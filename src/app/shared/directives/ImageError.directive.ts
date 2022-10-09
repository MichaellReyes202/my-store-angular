import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
   selector: '[appImageError]'
})
export class ImageErrorDirective {
   constructor(private element: ElementRef<HTMLImageElement>) { }

   // Escucha el evento error
   @HostListener('error') handleError(): void {
      this.element.nativeElement.src = 'https://www.san-manipulados.com/wp-content/uploads/2014/01/default_image_01.png'
   }

}
