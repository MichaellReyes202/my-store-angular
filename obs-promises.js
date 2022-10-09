
const { Observable, async } = require('rxjs');
const { filter  } = require('rxjs/operators');

const doSomething = () => {
   return new Promise((resolve,reject) => {
      // resolve('Valor 1');
      // resolve('Valor 2');
      setTimeout(() => {
         resolve('valor 3');
      }, 3000);
   });
}

const doSomething$ = () => {
   return new Observable(observer => {
      observer.next('Valor 1 $');
      observer.next('Valor 2 $');
      observer.next('Valor 3 $');
      observer.next(null);
      setTimeout(() => {
         observer.next('valor 4');
      }, 4000);
      setTimeout(() => {
         observer.next(null);
      }, 8000);
      setTimeout(() => {
         observer.next('valor 5');
      }, 10000);
   });
}

(async () => {
   const rta = await doSomething();
   console.log(rta);
})();

(()=> {
   const obs$ = doSomething$();
   obs$
   .pipe(
      filter(value => value !== null)
   )
   .subscribe(valor => {
      console.log(valor);
   })
})();
