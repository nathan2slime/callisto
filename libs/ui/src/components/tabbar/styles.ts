import { Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styled from 'styled-components/native';

const height = Dimensions.get('screen').height;

export const TabBarButton = styled.TouchableOpacity`
  flex: 1;
  height: ${height * 0.07}px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.accessibilityState?.selected
      ? props.theme.primaryColorDark
      : 'transparent'};
  border-radius: 8px;
`;

export const TabBarIcon = styled(Ionicons)`
  color: ${props =>
    props.accessibilityState?.selected
      ? props.theme.textColor
      : props.theme.placeholderColor};
`;

export const TabBarWrapper = styled.View`
  height: ${height * 0.07}px;
  background-color: ${props => props.theme.foregroundColorDark};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
