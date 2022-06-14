import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseIcon'
})
export class CourseIconPipe implements PipeTransform {

  transform(value: string, ): string {
    return `${value.toLowerCase()}`;
  }

}
