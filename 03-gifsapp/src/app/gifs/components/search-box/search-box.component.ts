import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.components.html'



})



export class SearchBoxComponent {


  /*
    ViewChild
    ViewChillder es lo mismo pero en un arreglo


    El primer parametro nos pide el nombre del input de nuestro html

    -- ELementoRef hace referencia a un elemento, en este caso
    como acepta genericocs indcamos que es un html input

    -- El viewchild le va a incorporar el valor que va a tomar medianete
    la referencia txtTagInput

  */
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  // Search tag sin viewchild
  searchTag1(newTag: string): void {
    console.log(newTag);
  }

  // searchTag con ViewChild
  searchTag(): void {

    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = "";
    console.log({ newTag });
  }

}
