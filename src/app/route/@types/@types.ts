export interface PromisseRouteParamsProps {
  source: string;
  destination: string;
}

export interface RouteProps {
  searchParams: Promise<PromisseRouteParamsProps>;
}


export interface PlacesProps {
    candidates: Candidate[];
    status: string;
  }
  
  export interface Candidate {
    formatted_address: string;
    geometry: Geometry;
    name: string;
    place_id: string;
  }
  
  export interface Geometry {
    location: Location;
    viewport: Viewport;
  }
  
  export interface Location {
    lat: number;
    lng: number;
  }
  
  export interface Viewport {
    northeast: Location;
    southwest: Location;
  }
  

  export interface CreateRoutesProps {
    name: string;
    source_id: string;
    destination_id: string;
  }
  