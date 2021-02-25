import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BeerCatalogComponent } from 'src/app/components/beer-catalog/beer-catalog.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isDarkLayoutMode: boolean = false;
  sortAttribute: string = 'name';
  beersPerLoad: string = '15';
  @ViewChild('catalog1') catalog1: BeerCatalogComponent | undefined;
  @ViewChild('catalog2') catalog2: BeerCatalogComponent | undefined;
  @ViewChild('catalog3') catalog3: BeerCatalogComponent | undefined;

  constructor(private el: ElementRef, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    const isDarkLayoutModeLocalStorage = this.localStorageService.getItem('isDarkLayoutMode');
    if (!isDarkLayoutModeLocalStorage) {
      this.localStorageService.setItem('isDarkLayoutMode', 'false');
    } else {
      this.isDarkLayoutMode = isDarkLayoutModeLocalStorage === 'true' ? true : false;
      this.updateLayout();
    }

    const beersPerLoadFromLocalStorage = this.localStorageService.getItem('beersPerLoad');
    if (!beersPerLoadFromLocalStorage) {
      this.localStorageService.setItem('beersPerLoad', '15');
    } else {
      this.beersPerLoad = beersPerLoadFromLocalStorage;
    }
  }

  onChangeLayout(): void {
    this.localStorageService.setItem('isDarkLayoutMode', String(this.isDarkLayoutMode));
    this.updateLayout();
  }

  updateLayout(): void {
    let content = this.el.nativeElement.querySelector("#content");
    if (!this.isDarkLayoutMode) {
      content.classList.remove('dark-layout');
    } else if (!content.classList.contains('dark-layout')) {
      content.classList.add('dark-layout');
    }
  }

  onChangeSortAttribute(): void {
    this.catalog1?.sortDisplayedBeersByAttribute(this.sortAttribute);
    this.catalog2?.sortDisplayedBeersByAttribute(this.sortAttribute);
    this.catalog3?.sortDisplayedBeersByAttribute(this.sortAttribute);
  }

  onChangeBeersPerLoad(): void {
    this.localStorageService.setItem('beersPerLoad', this.beersPerLoad);
  }

}
