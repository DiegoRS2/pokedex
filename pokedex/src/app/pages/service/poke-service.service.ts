import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemons } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeServiceService {

  url = "https://pokeapi.co/api/v2/pokemon?limit=1126&offset=0";
  
  constructor(private http: HttpClient) { }

  apiListAllPokemons(): Observable<{ results: Pokemons[] }> {
    return this.http.get<{ results: Pokemons[] }>(this.url).pipe(
      tap(res => res)
    )
  }
  public apiGetPokemon(url: string): Observable<Pokemons> {
    return this.http.get<Pokemons>(url).pipe(
      map(
        res => res
      )
    )
  }
}


