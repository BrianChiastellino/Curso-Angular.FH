import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl(' ');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(
    private heroesService: HeroesService,
  ) { }

  public searchHero(): void {
    const value: string = this.searchInput.value || '';
    this.heroesService.getSuggestion(value).subscribe(heroes => this.heroes = heroes);
  }

  /* Importante
    * El tipo de dato: MatAutocompleteSelectedEvent es para obtener
      la infromacion recibida desde el autocomplete, podemos acceder desde 'option.value'.

  */

  public onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) return this.selectedHero = undefined;

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;

  }
}
