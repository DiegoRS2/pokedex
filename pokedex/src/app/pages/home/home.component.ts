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
  poke: number = 1;
  searchText!: string;
  pokeFilter!: Pokemons[];

  constructor(
    private pokemonServices: PokeServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  public getPokemons() {
    this.pokemonServices.apiListAllPokemons().subscribe(
      res => {
        this.pokemon = res.results;
        this.pokemon = this.pokemon;
        this.getInformation();
        this.filtrar();
      }
    );
  }

  getInformation() {
    this.pokemon.forEach(
      pokeInformation => {
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
            this.filtrar();
          })
      })
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
}



