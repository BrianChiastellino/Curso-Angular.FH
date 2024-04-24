import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: []
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchByAlhpaCode(id)),
      )
      .subscribe(country => {
        if (!country) return this.router.navigateByUrl('')

        return this.country = country;
      }
      )

    //! Imporntante
    /*
      - Tuve que destrucutrar el objeto params para poder acceder a la propiedad ID ya que
      al ser de tipo any nunca iba poder aceder a la propiedad id

      - switchMap aquí se utiliza para manejar el flujo de datos cuando los parámetros de la ruta activada cambian.
      Cada vez que cambian los parámetros de la ruta,
      se cancela cualquier solicitud de búsqueda en curso y se realiza una nueva búsqueda utilizando los nuevos parámetros.
      Esto ayuda a evitar problemas como la llegada fuera de orden de las respuestas de la solicitud HTTP
       */
  }



}
