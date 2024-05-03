import { Pipe, type PipeTransform } from '@angular/core';
import { Color } from '../interfaces/hero.interface';

@Pipe({
  name: 'showColor',
})

export class ShowColorPipe implements PipeTransform {

  transform(value: Color): string | undefined {

    switch (value) {

      case Color.red:
        return 'red';

      case Color.black:
        return 'negro';

      case Color.blue:
        return 'azul';

      case Color.green:
        return 'verde';

      default: return;

    }

  }
}
