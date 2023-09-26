import React, {useState} from 'react';
import {Modal, SafeAreaView, StyleSheet, View} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {ModalCategories} from './src/components/ModalCategories';
import MapViewComponent from './src/components/MapViewComponent';
import {
  Coordinate,
  EventObject,
  Marker,
  SelectedImageType,
} from './src/types/TypesProps';
import {saveMarkersToJson} from './src/helpers/saveMarkersToJson';

const App = () => {
  const [isLongPressActive, setIsLongPressActive] = useState(false);
  const [markerCoordinate, setMarkerCoordinate] = useState<Marker[]>([]);
  const [isCoordinate, setIsCoordinate] = useState<Coordinate>({
    latitude: 0,
    longitude: 0,
  });
  const [selectedImage, setSelectedImage] = useState<SelectedImageType>([]);

  const handleOpenModal = (e: EventObject) => {
    const newCoordinate = e.nativeEvent.coordinate;
    setIsCoordinate(newCoordinate);
    setIsLongPressActive(true);
  };

  const pickPhotoFromLibrary = async () => {
    const options = {
      storageOptions: {
        path: 'image',
      },
      selectionLimit: 0,
    };

    launchImageLibrary(options, async response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImages = response.assets.map(asset => asset.uri);
        setSelectedImage(selectedImages);
      }
    });
  };

  const pickMedia = async (mediaType: string) => {
    const options = {
      mediaType: mediaType,
      videoQuality: 'high',
      durationLimit: 30,
      storageOptions: {
        path: mediaType === 'photo' ? 'image' : 'video',
      },
    };

    launchCamera(options, async response => {
      if (response.assets && response.assets.length > 0) {
        const mediaUri = response.assets[0].uri;
        setSelectedImage([mediaUri]);
      }
    });
  };

  const handleSave = () => {
    const id = Math.random() * 100;
    setMarkerCoordinate((prev: Marker[]) => [
      ...prev,
      {
        id,
        coordinate: {
          latitude: isCoordinate.latitude,
          longitude: isCoordinate.longitude,
        },
        title: String(id),
        image: selectedImage,
      },
    ]);

    setSelectedImage([]);
    setIsLongPressActive(false);
    saveMarkersToJson(markerCoordinate);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapViewComponent
          markerCoordinate={markerCoordinate}
          handleOpenModal={handleOpenModal}
        />
      </View>

      <Modal
        visible={isLongPressActive}
        animationType="none"
        transparent={true}>
        <ModalCategories
          setIsLongPressActive={setIsLongPressActive}
          pickPhotoFromLibrary={pickPhotoFromLibrary}
          selectedImage={selectedImage}
          handleSave={handleSave}
          pickMedia={pickMedia}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
