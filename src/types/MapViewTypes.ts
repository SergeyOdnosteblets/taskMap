import {MarkerType} from './MarkerType';
import {EventObject} from './TypesProps';

export interface MapViewType {
  handleOpenModal: (event: EventObject) => void;
  markerCoordinate: MarkerType[];
}
