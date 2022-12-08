import React, { FC } from 'react';

import { TouchableOpacityProps } from 'react-native';

import {
  CardWrapper,
  DescriptionWrapper,
  ImageStyles,
  PriceStyles,
  TitleStyles,
} from './styles';

type UICardProps = {
  name: string;
  model: string;
  photo: string;
  brand: string;
  price: string;
} & TouchableOpacityProps;

export const UICard: FC<UICardProps> = props => {
  return (
    <CardWrapper {...props}>
      <ImageStyles source={{ uri: props.photo }} />

      <DescriptionWrapper>
        <TitleStyles>{`${props.brand} ${props.model} ${props.name}`}</TitleStyles>

        <PriceStyles>{props.price}</PriceStyles>
      </DescriptionWrapper>
    </CardWrapper>
  );
};
