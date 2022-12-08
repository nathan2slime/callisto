import { Dimensions, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Ionicons';

const height = Dimensions.get('screen').height;

type DropdownItemSeparator = {
  hasSeparator: boolean;
} & TouchableOpacityProps;

export const IconStyles = styled(Icon)`
  color: ${props => props.theme.primaryColorLight};
`;

export const ButtonSelect = styled.TouchableOpacity`
  background-color: ${props => props.theme.foregroundColorLight};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${props =>
    props.accessibilityState?.selected
      ? props.theme.primaryColorLight
      : 'transparent'};
  height: ${height * 0.06}px;
  padding: 10px 15px;
`;

export const ButtonText = styled.Text`
  flex: 1;
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  font-size: ${height * 0.017}px;
  color: ${props =>
    props.disabled ? props.theme.placeholderColor : props.theme.textColor};
  letter-spacing: 0.6px;
`;

export const DropdownWrapper = styled.View`
  position: absolute;

  width: 100%;
  max-height: ${height * 0.06 * 4}px;
  background-color: ${props => props.theme.foregroundColorLight};
  border-radius: 8px;
`;

export const DropdownItem = styled.TouchableOpacity<DropdownItemSeparator>`
  height: ${height * 0.06}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;

  border-bottom-width: ${props => (props.hasSeparator ? 1 : 0)}px;
  border-color: ${props => props.theme.borderColor};
`;
