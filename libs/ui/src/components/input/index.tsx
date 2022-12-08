import React, { FC, useState } from 'react';
import { TextInputProps } from 'react-native';

import {
  TextInput,
  TextInputMessage,
  TextInputLabel,
  TextInputWrapper,
} from './styles';

export type UITextInputProps = {
  invalid?: boolean;
  label?: string;
  message?: string;
} & TextInputProps;

export const UITextInput: FC<UITextInputProps> = props => {
  const [focused, setFocused] = useState(false);

  return (
    <TextInputWrapper>
      {props.label && <TextInputLabel>{props.label}</TextInputLabel>}

      <TextInput
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityState={{ selected: focused }}
      />

      {props.invalid && <TextInputMessage>{props.message}</TextInputMessage>}
    </TextInputWrapper>
  );
};

UITextInput.defaultProps = {
  invalid: false,
  message: '',
};
