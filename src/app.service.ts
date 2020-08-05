import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Custom-Authorization": "Bearer noauth"
    })
  };

  getAllPokemon() {
    return this.http.get<any>(
      "https://pokeapi.co/api/v2/pokemon?offset=200&limit=200",
      this.httpOptions
    );
  }

  getPokemonDetails(url) {
    return this.http.get<any>(url, this.httpOptions);
  }
}
