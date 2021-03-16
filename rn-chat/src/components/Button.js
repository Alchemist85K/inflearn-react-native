import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  background-color: ${({ theme }) => theme.btnBackground};
  padding: 10px;
  margin: 10px 0;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;
const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.btnTitle};
`;

const Button = ({ title, onPress, containerStyle, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row' }}
      disabled={disabled}
    >
      <Container style={containerStyle} disabled={disabled}>
        <Title style={textStyle}>{title}</Title>
      </Container>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Button;
