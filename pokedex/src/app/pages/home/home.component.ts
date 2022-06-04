import { forkJoin, Observable } from 'rxjs';
import { PokeApi } from './../service/pokemon.model';
import { Pokemons, } from '../service/pokemon.model';
import { PokeServiceService } from '../service/poke-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemon: Pokemons[] = [];
  searchText!: string;
  pokeFilter!: Pokemons[];
  pokeApi!: PokeApi;
  loading = false;
  isLoading = true;

  constructor(
    private pokemonServices: PokeServiceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  public getPokemons(type?: 'previous' | 'next') {
    let url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
    if (type === 'next' && !!this.pokeApi?.next) {
      url = this.pokeApi?.next as string;
    }

    else if (type === 'previous' && !!this.pokeApi?.previous) {
      url = this.pokeApi?.previous as string
    }

    this.pokemonServices.apiListAllPokemons(url).subscribe(
      res => {
        this.pokeApi = res;
        this.pokemon.push(...res.results as Pokemons[])

        // this.getInformation();

        this.getPokemon().subscribe(p => {
        let index = 0;
        for (let i = this.pokemon.length - 20; i < this.pokemon.length; i++) {
            let pokeId = Number.parseInt(this.pokemon[i].url
              .replace('https://pokeapi.co/api/v2/pokemon/', '')
              .replace('/', ''));
           
            this.pokemon[i].types = p[index].types;
            this.pokemon[i].abilities = p[index].abilities;
            this.pokemon[i].forms = p[index].forms;
            this.pokemon[i].game_indices = p[index].game_indices;
            this.pokemon[i].height = p[index].height;
            this.pokemon[i].held_items = p[index].held_items;
            this.pokemon[i].id = p[index].id;
            this.pokemon[i].is_default = p[index].is_default;
            this.pokemon[i].location_area_encounters = p[index].location_area_encounters;
            this.pokemon[i].moves = p[index].moves;
            this.pokemon[i].order = p[index].order;
            this.pokemon[i].past_types = p[index].past_types;
            this.pokemon[i].species = p[index].species;
            this.pokemon[i].sprites = p[index].sprites;
            this.pokemon[i].stats = p[index].stats;
            this.pokemon[i].weight = p[index].weight;
            index ++
          }
          this.filtrar();
          this.isLoading = false;
        });

      }
    );

  }

  getInformation() {
    this.pokemon.forEach(
      pokeInformation => {

        if (!pokeInformation.url) {
          return;
        }

        this.pokemonServices.apiGetPokemon(pokeInformation.url).subscribe(
          x => {
            pokeInformation.url = x.url;
            pokeInformation.abilities = x.abilities;
            pokeInformation.forms = x.forms;
            pokeInformation.game_indices = x.game_indices;
            pokeInformation.height = x.height;
            pokeInformation.held_items = x.held_items;
            pokeInformation.id = x.id;
            pokeInformation.is_default = x.is_default;
            pokeInformation.location_area_encounters = x.location_area_encounters;
            pokeInformation.moves = x.moves;
            pokeInformation.order = x.order;
            pokeInformation.past_types = x.past_types;
            pokeInformation.species = x.species;
            pokeInformation.sprites = x.sprites;
            pokeInformation.stats = x.stats;
            pokeInformation.types = x.types;
            pokeInformation.weight = x.weight;

          })
      })
    this.filtrar();
    this.isLoading = false;
  }

  filtrar() {
    const searchText = this.searchText?.toUpperCase();
    this.pokeFilter = this.pokemon.filter(a =>
      !searchText || a.name?.toUpperCase().includes(searchText)
    );
  }

  navigation(id: number) {
    this.router.navigate(['informations'], { queryParams: { id: id } })
  }

  onScroll() {
    this.loading = true;
    this.getPokemons('next');
  }

  public getPokemon() {
    let poke: Observable<Pokemons>[] = []
    for (let i = this.pokemon.length - 20; i < this.pokemon.length; i++) {

      poke.push(this.pokemonServices.apiGetPokemon(this.pokemon[i].url));
    }
    return forkJoin(poke);
  }
}






