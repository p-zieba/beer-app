import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BeerCatalogComponent } from 'src/app/components/beer-catalog/beer-catalog.component';
import { OptionsService } from 'src/app/services/options.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isDarkLayoutMode: boolean;
  sortAttribute: string = 'name';
  beersPerLoad: string;
  @ViewChild('catalog1') catalog1: BeerCatalogComponent | undefined;
  @ViewChild('catalog2') catalog2: BeerCatalogComponent | undefined;
  @ViewChild('catalog3') catalog3: BeerCatalogComponent | undefined;

  constructor(
    private el: ElementRef,
    private optionsService: OptionsService
  ) {
    this.isDarkLayoutMode = this.optionsService.isDarkLayoutMode();
    this.beersPerLoad = this.optionsService.getBeersPerLoad();
    this.sortAttribute = this.optionsService.getSortAttribute();
  }

  ngOnInit(): void {
    this.updateLayout();
  }

  onChangeLayout(): void {
    this.optionsService.setDarkLayoutMode(this.isDarkLayoutMode);
    this.updateLayout();
  }

  private updateLayout(): void {
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
    this.optionsService.setSortAttribute(this.sortAttribute);
  }

  onChangeBeersPerLoad(): void {
    this.optionsService.setBeersPerLoad(this.beersPerLoad);
  }

}
