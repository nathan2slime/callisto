import { UIButton } from '@cars/ui';
import React, { FC } from 'react';
import themes from '@cars/themes';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useColorScheme, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { APP_STATE } from '../../store';
import { setUser } from '../../store/actions';
import {
  ProfileWrapper,
  ProfileHeader,
  ProfileHeaderText,
  ProfileCard,
} from './styles';

const Profile: FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = themes[useColorScheme() || 'dark'];
  const user = useSelector((state: APP_STATE) => state.user);

  const onLogout = () => {
    dispatch(setUser({ data: undefined, logged: false, token: undefined }));
  };

  return (
    <ProfileWrapper>
      <ProfileCard>
        <ProfileHeader>
          <Icon
            name="md-person-circle-outline"
            size={60}
            color={theme.primaryColorLight}
          />

          <ProfileHeaderText>
            {user.logged
              ? user.data?.name
              : "It looks like you are not logged in, try logging into your account or creating one if you don't have one."}
          </ProfileHeaderText>

          <ProfileHeaderText>{user.data?.email}</ProfileHeaderText>
        </ProfileHeader>

        {user.logged ? (
          <UIButton
            color="error"
            type="outline"
            style={styles.action}
            onPress={onLogout}
            title="LOGOUT"
          />
        ) : (
          <UIButton
            type="solid"
            style={styles.action}
            onPress={() => navigation.push('Login')}
            title="LOGIN"
          />
        )}
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  action: {
    marginTop: 50,
  },
});
