import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const height = Dimensions.get('screen').height;

export const ProfileWrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.backgroundColor};

  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 450px;
`;

export const ProfileCard = styled.View`
  background-color: ${props => props.theme.foregroundColorDark};
  border-radius: 8px;
  padding: 30px 20px;
`;

export const ProfileHeader = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileHeaderText = styled.Text`
  font-family: ${props => props.theme.fontFamily};
  font-weight: 400;
  font-size: ${height * 0.02}px;
  color: ${props => props.theme.textColor};
  font-weight: 600;
  letter-spacing: 0.6px;
  text-align: center;
  max-width: 300px;

  margin-top: 20px;
`;
