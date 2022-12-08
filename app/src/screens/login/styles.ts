import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const height = Dimensions.get('screen').height;

export const LoginWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};

  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 450px;
`;

export const LoginTitle = styled.Text`
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  font-size: ${height * 0.03}px;
  color: ${props => props.theme.textColor};
  font-weight: 600;
  letter-spacing: 0.6px;
  text-align: center;
  margin-top: 13px;
`;

export const GoSignupText = styled.Text`
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  font-size: ${height * 0.017}px;
  letter-spacing: 0.6px;
  color: ${props => props.theme.primaryColorLight};
`;

export const LoginHeader = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;
