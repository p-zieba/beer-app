import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

enum Options {
  IsDarkLayoutMode = 'isDarkLayoutMode',
  BeersPerLoad = 'beersPerLoad',
  SortAttribute = 'sortAttribute'
}

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  constructor(private localStorageService: LocalStorageService) { }

  isDarkLayoutMode(): boolean {
    const isDarkLayoutModeFromLocalStorage = this.localStorageService.getItem(Options.IsDarkLayoutMode);
    if (!isDarkLayoutModeFromLocalStorage) {
      this.localStorageService.setItem(Options.IsDarkLayoutMode, 'false');
      return false;
    } else if (isDarkLayoutModeFromLocalStorage === 'true') {
      return true;
    }

    return false;
  }

  getBeersPerLoad(): string {
    const beersPerLoadFromLocalStorage = this.localStorageService.getItem(Options.BeersPerLoad);
    if (beersPerLoadFromLocalStorage) {
      return beersPerLoadFromLocalStorage;
    }

    this.localStorageService.setItem(Options.BeersPerLoad, '15');
    return '15';
  }

  getSortAttribute(): string {
    const sortAttributeFromLocalStorage = this.localStorageService.getItem(Options.SortAttribute);
    if (sortAttributeFromLocalStorage) {
      return sortAttributeFromLocalStorage;
    }

    const defaultValue = 'name';
    this.localStorageService.setItem(Options.SortAttribute, defaultValue);
    return defaultValue;
  }

  setDarkLayoutMode(value: boolean): void {
    this.localStorageService.setItem(Options.IsDarkLayoutMode, String(value));
  }

  setBeersPerLoad(value: string): void {
    this.localStorageService.setItem(Options.BeersPerLoad, value);
  }

  setSortAttribute(value: string): void {
    this.localStorageService.setItem(Options.SortAttribute, value);
  }
}
