interface LocationSearchResult {
  bounds: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
  components: {
    city: string;
    country: string;
  };
}

export interface LocationSearch {
  results: Array<LocationSearchResult>;
}
