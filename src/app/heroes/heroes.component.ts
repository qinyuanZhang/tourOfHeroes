import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  heroes: Hero[];
  heroes$: Observable<Hero[]>;
  name: string;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
    console.log(this.heroes);
  }

  ngOnChanges() {
    // console.log(this.heroes);
  }

  ngDoCheck() {
    console.log('ngDoCheck', this.heroes);
    if (this.name) {
      console.log(this.name);
    }
  }

  ngAfterContentInit() {
    // console.log(this.heroes);
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked', this.heroes);
  }

  ngAfterViewInit() {
    // console.log(this.heroes);
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked', this.heroes);
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    // this.heroes$ = this.heroService.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe(
      hero => this.heroes.push(hero)
    );
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
