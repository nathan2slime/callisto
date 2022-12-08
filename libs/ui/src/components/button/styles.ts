import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { UIButtonProps } from './index';

const height = Dimensions.get('screen').height;

export const ButtonWrapper = styled.TouchableOpacity<UIButtonProps>`
  height: ${height * 0.06}px;
  background-color: ${props =>
    props.type == 'outline'
      ? 'transparent'
      : (props.theme as any)[`${props.color}ColorDark`]};

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  border-width: 1px;
  border-color: ${props =>
    props.type == 'solid'
      ? 'transparent'
      : (props.theme as any)[`${props.color}ColorDark`]};
`;

export const ButtonText = styled.Text`
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  font-size: ${height * 0.018}px;
  color: ${props => props.theme.textColor};
  letter-spacing: 0.6px;
`;
