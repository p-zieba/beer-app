import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Beer } from 'src/app/defs/beer';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-beer-catalog',
  templateUrl: './beer-catalog.component.html',
  styleUrls: ['./beer-catalog.component.scss']
})
export class BeerCatalogComponent implements OnInit {

  @Input() catalogKey: string | undefined;
  beers: Beer[] = [];
  brewers: string[] = [];
  selectedBrewer: string = '';
  displayedBeers: Beer[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any[]>('/beers')
      .subscribe((data) => {
        data.forEach(item => {
          const beer: Beer = {
            brewer: item.brewer,
            id: item.beer_id,
            imageUrl: item.image_url,
            name: item.name,
            price: item.price,
            type: item.type
          }
          this.beers.push(beer);
          this.brewers.push(item.brewer);
        });

        this.brewers = Utils.removeDuplicates(this.brewers);
        Utils.sortArrayAlphabetically(this.brewers);
        Utils.sortArrayAlphabeticallyByAttribute(this.beers, 'name');

        if (this.catalogKey) {
          const selectedBrewerFromLocalStorage = this.localStorageService.getItem(this.catalogKey);
          if (selectedBrewerFromLocalStorage) {
            this.selectedBrewer = selectedBrewerFromLocalStorage;
            this.onChangeBrewer();
          }
        }
      });
  }

  onChangeBrewer(): void {
    this.displayedBeers = this.beers.filter(beer => beer.brewer === this.selectedBrewer);
    if (this.catalogKey) {
      this.localStorageService.setItem(this.catalogKey, this.selectedBrewer);
    }
  }

  sortDisplayedBeersByAttribute(attributeName: string): void {
    Utils.sortArrayAlphabeticallyByAttribute(this.displayedBeers, attributeName);
  }

}
