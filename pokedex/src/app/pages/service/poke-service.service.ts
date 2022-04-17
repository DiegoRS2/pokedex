import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Pokemons, PokeApi } from './pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeServiceService {

  constructor(private http: HttpClient) { }

  apiListAllPokemons(url: string): Observable<PokeApi> {
    return this.http.get<PokeApi>(url).pipe(
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


