export interface ModalTypes {
  setIsLongPressActive: (value: boolean) => void;
  pickPhotoFromLibrary: () => void;
  selectedImage: string[];
  handleSave: () => void;
  pickMedia: (value: string) => void;
}
