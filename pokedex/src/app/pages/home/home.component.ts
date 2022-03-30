import { Types } from './../service/pokemon.model';
import { Pokemons, } from '../service/pokemon.model';
import { PokeServiceService } from '../service/poke-service.service';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  public types: Types[] = [];
 
  constructor(
    private pokemonServices: PokeServiceService,
    private modalService: NgbModal
    ) { }

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

  openModal() {
    this.modalService.open(ModalComponent, { size: 'ng' });
  }
}



