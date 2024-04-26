import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './searchBox.component.html',
  styles: []

})
export default class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>();
  //Subject es un tipo de Observable, tenemos los pipe, subscribe, etc

  private debouncerSubscription?: Subscription;

  @Input() public placeholder: string = '';
  @Input() public initialValue: string = '';
  @Output() public onValue = new EventEmitter<string>();
  @Output() public onDebounce = new EventEmitter<string>();

  constructor() { }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  /* //!Imporntante
  - Cuando nosotors nos subscribimos exeptuando a los metodos htttp (get,put,delete...)
  tenemos que dessubcsicirbirnos para no saturar la memoria del programa
  */

  ngOnInit(): void {

    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(1000),
      ).subscribe(value => {
        this.onDebounce.emit(value);
      })

  }

  /*
  - debounceTime sirve como una barrera
    cuando se dejen de emitir valores por x tiempo
    le pasa la informacion al subscribe
  */


  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }








}
