import { Country } from "./country.interfaces";
import { Region } from "./region.type";

//!Imporntante

export interface CacheStore {

  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: RegionCountries;

}

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region: Region;
  countries: Country[];
}
