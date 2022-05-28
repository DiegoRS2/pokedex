import { PokeApi } from './../service/pokemon.model';
import { Pokemons, } from '../service/pokemon.model';
import { PokeServiceService } from '../service/poke-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private pokemonServices: PokeServiceService,
    private router: Router,
    private spinner: NgxSpinnerService
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

        this.getInformation();
        this.filtrar();
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

  onScroll(){ 
      this.getPokemons('next');
  }
}



