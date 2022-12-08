import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const height = Dimensions.get('screen').height;

export const IndexWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};
  padding: 25px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const AlertRemoveTitle = styled.Text`
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  font-size: ${height * 0.02}px;
  color: ${props => props.theme.textColor};
  font-weight: 600;
  letter-spacing: 0.6px;
  text-align: left;
`;

export const ItemWrapper = styled.View`
  flex: 1;
  width: 100%;
  max-width: 350px;

  margin-top: 10px;
`;

export const ModalAdmin = styled.View`
  background-color: ${props => props.theme.foregroundColorDark};
`;
