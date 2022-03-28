import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pathToLabel' })
export class PathToLabelPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    'asdf'.toLocaleUpperCase;
    return value.split('-').join(' ');
  }
}
