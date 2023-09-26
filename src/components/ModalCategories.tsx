import {View, StyleSheet, Button, Image} from 'react-native';
import {ModalTypes} from '../types/ModalCategoriesType';
export const ModalCategories = ({
  setIsLongPressActive,
  pickPhotoFromLibrary,
  selectedImage,
  handleSave,
  pickMedia,
}: ModalTypes) => {
  return (
    <View style={styles.backdrop}>
      <View style={styles.modal}>
        {selectedImage.length > 0 &&
          selectedImage.map((item: string) => {
            return (
              <View key={item}>
                <Image style={{width: 100, height: 150}} source={{uri: item}} />
              </View>
            );
          })}
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button
              title="Pick from Library"
              onPress={pickPhotoFromLibrary}
              color="gray"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Take Photo"
              onPress={() => pickMedia('photo')}
              color="gray"
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Take Video"
              onPress={() => pickMedia('video')}
              color="gray"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: 200,
          }}>
          <Button title="Save" onPress={handleSave} color="green" />
          <Button
            title="Close"
            onPress={() => setIsLongPressActive(false)}
            color="red"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  modal: {
    backgroundColor: '#353642',
    width: '80%',
    maxWidth: 400,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'column',
    marginVertical: 10,
    width: 200,
  },
  button: {
    marginVertical: 5,
  },
});
