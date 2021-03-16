import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imgBtnBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;
const ButtonIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: 'photo-camera',
  size: 22,
  color: theme.imgBtnIcon,
}))``;
const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  );
};

const Container = styled.View`
  margin-bottom: 30px;
`;
const ProfileImage = styled.Image`
  background-color: ${({ theme }) => theme.imgBackground};
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Image = ({ url, showButton, onChangePhoto }) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Photo Permission',
            'Please turn on the camera permission.'
          );
        }
      }
    })();
  }, []);

  const _handlePhotoBtnPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      onChangePhoto(result.uri);
    }
  };

  return (
    <Container>
      <ProfileImage source={{ uri: url }} />
      {showButton && <PhotoButton onPress={_handlePhotoBtnPress} />}
    </Container>
  );
};

Image.propTypes = {
  url: PropTypes.string,
  showButton: PropTypes.bool,
  onChangePhoto: PropTypes.func,
};

export default Image;
