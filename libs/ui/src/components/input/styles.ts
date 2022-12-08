import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { UITextInputProps } from './index';

const height = Dimensions.get('screen').height;

export const TextInput = styled.TextInput<UITextInputProps>`
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  color: ${props => props.theme.textColor};
  font-size: ${height * 0.018}px;
  height: ${height * 0.06}px;
  background: ${props => props.theme.foregroundColorLight};

  border-width: 1px;
  border-color: ${props =>
    props.invalid
      ? props.theme.errorColorLight
      : props.accessibilityState?.selected
      ? props.theme.primaryColorLight
      : 'transparent'};
  border-radius: 8px;
  letter-spacing: 0.6px;
  padding: 10px 15px;
`;

export const TextInputWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

export const TextInputMessage = styled.Text`
  margin-top: 8px;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  color: ${props => props.theme.errorColorLight};
  letter-spacing: 0.6px;
  font-size: ${height * 0.016}px;
`;

export const TextInputLabel = styled.Text`
  margin-bottom: 8px;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  color: ${props => props.theme.textColor};
  letter-spacing: 0.6px;
  font-size: ${height * 0.016}px;
`;
