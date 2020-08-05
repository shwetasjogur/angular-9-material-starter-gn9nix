import { Component, ViewChild } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AppService } from "../app.service";

export interface PokemonData {
  name: string;
  url: string;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  displayedColumns: string[] = ["name", "url"];
  dataSource: MatTableDataSource<PokemonData>;
  response;
  pickedData = [];
  PokemonOfDay = [];
  lastUpdateTime = new Date(2017, 3, 1).getTime();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getAllPokemon().subscribe(res => {
      this.response = res;
      this.dataSource = new MatTableDataSource(res.results);
      this.pickRandomPokemon(res.results);
    });
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  pickRandomPokemon(val) {
    // ---- code for random pick for 4sec ---

    // setInterval(() => {
    //   this.pickedData = [];
    //   let random = val[Math.floor(Math.random() * val.length)];
    //   this.pickedData.push(random);
    //   this.pickedData.forEach(x => {
    //     this.appService.getPokemonDetails(x.url).subscribe(response => {
    //       this.pickedData[0]["imageUrl"] = response.sprites.front_default;
    //     });
    //   });
    //   console.log(this.pickedData)
    // }, 4000);

    // ---- code for random pick a day ---
    this.pickedData = [];
      let day = new Date().getDay();
      this.pickedData.push(val[day % val.length]);
      this.pickedData.forEach(x => {
        this.appService.getPokemonDetails(x.url).subscribe(response => {
          console.log(response.sprites.front_default);
          this.pickedData[0]["imageUrl"] = response.sprites.front_default;
        });
      });
    }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
  }
}
