import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './heroPage.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;


  constructor(
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroService.getHeroeById(id))
      ).subscribe(hero => {

        if (!hero) return this.router.navigate(['/heroes/list']);

        return this.hero = hero;

      })
  }

  public goBack(): void{
    this.router.navigateByUrl('heroes/list')
  }


}
