import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.components.html'



})



export class SearchBoxComponent {

  @ViewChild('textTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;


  searchTag(newTag: string): void {
    console.log("algo");
    console.log(newTag);
  }

}
