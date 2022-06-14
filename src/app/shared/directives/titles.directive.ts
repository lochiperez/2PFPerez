import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitles]'
})
export class TitlesDirective {

  constructor(
    private element: ElementRef
  ) {
    element.nativeElement.style.fontSize = '32px';
    element.nativeElement.style.fontStyle = 'italic';
    element.nativeElement.style.fontWeight = 'bolder';
  }

}
