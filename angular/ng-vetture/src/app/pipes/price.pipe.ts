import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value1: number, value2: number): number {
    const coeff: number = Math.abs(10 - value1 / value2);
    return (value1 * value2) / (value1 / value2) / coeff;
  }

}
