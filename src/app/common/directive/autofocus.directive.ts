import { Directive, OnInit, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[myAutofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(private elementRef: ElementRef) { };

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }

  ngOnChanges(): void {
    this.elementRef.nativeElement.focus();
  }

}

