export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface EventObject {
  nativeEvent: {
    coordinate: Coordinate;
  };
}

export interface Marker {
  id: number;
  coordinate: Coordinate;
  title: string;
  image: string[];
}

export type SelectedImageType = string[];
