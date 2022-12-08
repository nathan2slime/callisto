import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const height = Dimensions.get('screen').height;

export const CardWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 250px;

  background-color: ${props => props.theme.foregroundColorLight};
  border-radius: 10px;
  overflow: hidden;
`;

export const ImageStyles = styled.Image`
  width: 100%;
  height: 160px;
`;

export const TitleStyles = styled.Text`
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  font-size: ${height * 0.018}px;
  color: ${props => props.theme.textColor};
  letter-spacing: 0.6px;
  margin-top: 18px;
`;

export const PriceStyles = styled.Text`
  font-family: ${props => props.theme.fontFamily};
  font-weight: 600;
  font-size: ${height * 0.017}px;
  color: ${props => props.theme.primaryColorLight};
  letter-spacing: 0.6px;
  margin-top: 10px;
`;

export const DescriptionWrapper = styled.View`
  padding: 0px 14px;
`;
