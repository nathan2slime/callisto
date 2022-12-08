import React, { FC } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { ButtonText, ButtonWrapper } from './styles';

export type UIButtonProps = {
  title: string;
  type?: 'outline' | 'solid';
  color?: 'primary' | 'error';
} & TouchableOpacityProps;

export const UIButton: FC<UIButtonProps> = props => {
  return (
    <ButtonWrapper {...props}>
      {props.children ? props.children : <ButtonText>{props.title}</ButtonText>}
    </ButtonWrapper>
  );
};

UIButton.defaultProps = {
  type: 'solid',
  color: 'primary',
};
