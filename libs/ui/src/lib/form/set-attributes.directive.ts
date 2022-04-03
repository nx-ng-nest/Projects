import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[setAttributes]' })
export class SetAttributeDirective implements AfterViewInit, OnInit {
  @Input() setAttributes!: Record<string, any>;
  constructor(public elementRef: ElementRef<HTMLInputElement>) {}
  ngOnInit(): void {
    console.log(this.setAttributes);
  }
  ngAfterViewInit(): void {
    this.setAttributesNow();
  }

  setAttributesNow() {
    for (const a of Object.entries(this.setAttributes)) {
      (this.elementRef.nativeElement as HTMLInputElement).setAttribute(
        a[0],
        a[1]
      );
    }
  }
}
