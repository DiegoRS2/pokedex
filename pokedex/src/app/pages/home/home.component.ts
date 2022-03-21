import { Pokemons, } from '../service/pokemon.model';
import { PokeServiceService } from '../service/poke-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemon: Pokemons[] = [];
  poke: number = 1;
  searchText!: string;
  pokefilter!: Pokemons[];
  name!: any;
  constructor(private pokemonServices: PokeServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPokemons();
    this.filtrar(this.searchText)
  }

  public getPokemons() {
    this.pokemonServices.apiListAllPokemons().subscribe(
      res => {
        this.pokemon = res.results;
        this.pokemon = this.pokemon;
        this.getInformation();
      }
    );
  }

  getInformation() {
    this.pokemon.forEach(
      pokeInformation => {
        this.pokemonServices.apiGetPokemon(pokeInformation.url).subscribe(
          x => {
            pokeInformation.sprites = x.sprites;
            pokeInformation.id = x.id;
            pokeInformation.types = x.types;
            this.filtrar(this.searchText);
          })
      })
  }

  filtrar(pokename: string) {
    if (pokename) {
      pokename = pokename.toUpperCase();

      this.pokefilter = this.pokefilter.filter(a =>
        a.name.toUpperCase().indexOf(pokename) >= 0,
        console.log(
          this.searchText
        )
      );
    }
  }
  search() {
    if (this.name == "") {
      this.ngOnInit();
    }
    else {
      this.pokefilter = this.pokefilter.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase)
      })
    }
  }
}



