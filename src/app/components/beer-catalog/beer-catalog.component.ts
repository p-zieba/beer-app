import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Beer } from 'src/app/defs/beer';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OptionsService } from 'src/app/services/options.service';
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
  undisplayedBeers: Beer[] = [];
  isMore: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private dataService: DataService,
    private optionsService: OptionsService
  ) { }

  ngOnInit(): void {
    this.dataService.fetchBeers()
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
    this.undisplayedBeers = [];
    this.displayedBeers = [];

    this.undisplayedBeers = this.beers.filter(beer => beer.brewer === this.selectedBrewer);
    Utils.sortArrayAlphabetically(this.undisplayedBeers);
    
    this.loadMore();
    if (this.catalogKey) {
      this.localStorageService.setItem(this.catalogKey, this.selectedBrewer);
    }
  }

  loadMore(): void {
    const beersPerLoad = this.optionsService.getBeersPerLoad();
    this.displayedBeers = this.displayedBeers.concat(this.undisplayedBeers.splice(0, Number(beersPerLoad)));
    this.isMore = this.undisplayedBeers.length > 0;
  }

  sortDisplayedBeersByAttribute(attributeName: string): void {
    Utils.sortArrayAlphabeticallyByAttribute(this.displayedBeers, attributeName);
  }

}
