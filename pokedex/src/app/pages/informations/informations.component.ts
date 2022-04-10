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

  constructor(
    private pokeservice: PokeServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getIdLink();
    this.getdetalhes();
  }
  getdetalhes() {
    const url = `https://pokeapi.co/api/v2/pokemon/${this.id}`;
    this.pokeservice.apiGetPokemon(url).subscribe(x => {
      this.pokemon = x;
    })
  }

  getIdLink() {
    this.route.queryParams.subscribe(x => {
      this.id = x['id'];
    })
  }
}
