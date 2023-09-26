import RNFS from 'react-native-fs';
import {MarkerType} from '../types/MarkerType';

export const saveMarkersToJson = async (data: MarkerType[]) => {
  try {
    const jsonMarkers = JSON.stringify(data);
    const filePath = RNFS.DocumentDirectoryPath + '/markers.json';

    await RNFS.writeFile(filePath, jsonMarkers, 'utf8');
    console.log('saved in file:', filePath);
  } catch (error) {
    console.error('Error:', error);
  }
};
