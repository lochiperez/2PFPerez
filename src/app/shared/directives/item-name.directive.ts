import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appItemName]'
})
export class ItemNameDirective {

  constructor(
    private element: ElementRef
  ) {
    element.nativeElement.style.fontSize = '16px';
    element.nativeElement.style.fontStyle = 'italic';
    element.nativeElement.style.fontWeight = 'bold';
  }

}
