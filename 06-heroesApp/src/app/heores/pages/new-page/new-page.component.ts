import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/dialog/confirmDialog/confirmDialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  /*
    * Ya que el id del superheroe nos viene por parametro , captamos el id por switchMap

  */

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id)),
      ).subscribe(hero => {

        if (!hero) this.router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      });

  }

  /*
    * nonNullAble: true estamos diciendo de que no aceptamos nulos en ese atributo


  */

  public heroForm = new FormGroup({

    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),

  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ]

  /*
    * Con el parametro " as " estamos diciendo que el valor que retorne del formulario,
      lo trate como a un heroe

  */

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  public onSubmit(): void {

    debugger;

    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackBar(`${hero.superhero} updated!`)
        })
      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackBar(`${hero.superhero} created!`)

      });
  }


  /*
    * filter funciona como un if es decir, si el valor que recibe es undefined o falso,
        corta el curso de la funcion, si result es true sigue.
    * En el segundo filter filtramos si fue deleteado con exito
    * Si todo fue bien y paso los filtros, quiere decir que se elimino correctamente, entonces,
        no hace falta hacer otra validacion, directamente redirigimos.
  */

  onDeleteHero(): void {
    if (!this.currentHero.id) throw Error('Hero id is requiered');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result),
      switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )),
      filter( (wasDeleted: boolean) => wasDeleted ),
    )
    .subscribe( () => {
      this.router.navigateByUrl('/heroes')
    })

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) return;

    //   this.heroesService.deleteHeroById(this.currentHero.id)
    //     .subscribe(wasDeleted => {
    //       if (wasDeleted) this.router.navigateByUrl('/heroes');

    //     })
    // });
  }

  /*
    * en open primer param es el mensaje
    * el segundo es un boton
    * el tercero son mas metodos.
  */

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'done', {
      duration: 2500,
    });
  }



}
