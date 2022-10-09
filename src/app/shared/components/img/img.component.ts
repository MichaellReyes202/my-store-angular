import {
   Component,
   OnInit,
   Input,
   Output,
   EventEmitter ,
   OnChanges,
   SimpleChanges,
   AfterViewInit,
   OnDestroy
} from '@angular/core';

@Component({
   selector: 'app-img',
   templateUrl: './img.component.html',
   styleUrls: ['./img.component.scss']
})
export class ImgComponent  {

   img: string = ''

   @Input('img') set changeImg(newImg: string){
      this.img = newImg;
      //console.log('change just img => ',this.img);
   }

   @Input() alt: string = '';
   @Output() loaded = new EventEmitter<string>();
   counter: number = 0;
   counterFn: any;

   imageDefault: string = '../../../assets/images/default.png'
   constructor() {
   }


   imgError(): void{
      this.img = this.imageDefault;
   }
   imgLoaded(): void{
      console.log('log hijo');
      this.loaded.emit(this.img);
   }


   // https://w3schools.com/howto/img_avatar.png
}
