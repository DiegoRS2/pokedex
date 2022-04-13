import { Pokemons } from './../service/pokemon.model';
import { PokeServiceService } from './../service/poke-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent implements OnInit {
  id!: number;
  pokemon!: Pokemons;
  poke!: Pokemons;

  constructor(
    private pokeservice: PokeServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getIdLink();
    this.getdetalhes();
    //this.getSpecies();
  }
  getdetalhes() {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
    this.pokeservice.apiGetPokemon(url).subscribe(x => {
      this.pokemon = x;
      this.getImagePokemon();
    })
  }
  // getSpecies(){
  //   const baseUrl= 'https://pokeapi.co/api/v2/pokemon-species';
  //   this.pokeservice.apiGetPokemon(baseUrl).subscribe(y =>{
  //     this.poke = y;
  //     console.log(y);
  //   })
  // }
  getImagePokemon(){
    this.pokemon.sprites.spritesWorld = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.id}.svg`
  }

  getIdLink() {
    this.route.queryParams.subscribe(x => {
      this.id = x['id'];
    })
  }
}
