import {View, Text, Image, StyleSheet} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import {MarkerType} from '../types/MarkerType';
import {initialRegion} from '../assets/initialRegion';
import {MapViewType} from '../types/MapViewTypes';

const MapViewComponent = ({markerCoordinate, handleOpenModal}: MapViewType) => {
  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={initialRegion}
      onLongPress={handleOpenModal}>
      {markerCoordinate.map((marker: MarkerType) => (
        <Marker
          key={marker.id}
          coordinate={marker.coordinate}
          title={marker.title}
          style={{height: 150, width: 100}}>
          <Callout>
            <Text>{marker.title}</Text>
            <View style={styles.bubble}>
              <Text>
                {!!marker.image.length &&
                  marker.image.map((item: string) => {
                    return (
                      <Image
                        key={item}
                        style={{height: 150, width: 100}}
                        source={{
                          uri: item,
                        }}
                      />
                    );
                  })}
              </Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};
export default MapViewComponent;

const styles = StyleSheet.create({
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    height: '100%',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  image: {
    width: '100%',
    height: 80,
  },
});
