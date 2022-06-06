import { Pokemons } from './../service/pokemon.model';
import { PokeServiceService } from './../service/poke-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {
  id!: number;
  pokemon!: Pokemons;
  poke!: Pokemons;
  idSoma!: number;
  load! : HomeComponent;

  constructor(
    private pokeservice: PokeServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getIdLink();
    this.getdetalhes();
  }
  nextPokemon() {
    this.id = 1 + Number(this.id)
    const url = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
    this.pokeservice.apiGetPokemon(url).subscribe(y => {
      this.pokemon = y;
      this.pokemon.sprites.spritesWorld = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.id}.svg`
    })
  }

  previousPokemon() {
    if (this.id != 1) {
      this.id = Number(this.id) - 1;
      const url = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
      this.pokeservice.apiGetPokemon(url).subscribe(y => {
        this.pokemon = y;
        this.pokemon.sprites.spritesWorld = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.id}.svg`
      })
    }
    else {
      return
    }
  }

  getdetalhes() {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
    this.pokeservice.apiGetPokemon(url).subscribe(x => {
      this.pokemon = x;
      this.getImagePokemon();
    })
  }

  getImagePokemon() {
    this.pokemon.sprites.spritesWorld = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.id}.svg`
  }

  getIdLink() {
    this.route.queryParams.subscribe(x => {
      this.id = x['id'];
    })
  }

  home() {
    this.router.navigate(['']); 
  }
}
