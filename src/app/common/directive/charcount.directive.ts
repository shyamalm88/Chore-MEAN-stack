import {OnInit, Directive, ElementRef, Renderer, Input} from '@angular/core';


@Directive({
  selector: '[charCount]',
  inputs: ['limit:charCount'],
  host: {
    '(keyup)': '_onKeyUp()',
  }
})

export class CharCount implements OnInit {
  private _defaultLimit: number = 200;
  private _countDisplay: any;
  private _replaceDisplay: any;
@Input('charCount') private _limit: number;
  constructor(private _elRef: ElementRef, private _renderer: Renderer) {}
  private _onKeyUp() {
    let count: any = this._elRef.nativeElement.value.length;
    this._renderer.setText(this._countDisplay, (this._limit - count) + ' remaining.');
    if (count > this._limit) {
      this._renderer.setElementStyle(this._countDisplay, 'color', 'red');
      this._elRef.nativeElement.nextElementSibling.innerText =  (this._limit - this._elRef.nativeElement.value.length) + ' remaining.';
    }
    else {
      this._renderer.setElementStyle(this._countDisplay, 'color', 'inherit');
      this._elRef.nativeElement.nextElementSibling.innerText =  (this._limit - this._elRef.nativeElement.value.length) + ' remaining.';
    }
  }
  ngOnInit():any {
    this._limit = this._limit || this._defaultLimit;
    this._countDisplay = this._renderer.createElement(this._elRef.nativeElement.parentElement, 'span');
    this._renderer.createText(this._countDisplay, (this._limit - this._elRef.nativeElement.value.length) + ' remaining.');
  }
}