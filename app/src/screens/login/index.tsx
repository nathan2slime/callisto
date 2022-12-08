import themes from '@cars/themes';
import { UIButton, UITextInput } from '@cars/ui';
import { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { GoSignupText, LoginTitle, LoginWrapper, LoginHeader } from './styles';
import { DataLogin, loginService } from '../../services/auth';
import { setUser } from '../../store/actions';
import { APP_STATE } from '../../store';
import { getVerticalSpace, validationErrorMessage } from '../../utils';

const schema = yup.object().shape({
  email: yup
    .string()
    .required(validationErrorMessage.required)
    .trim()
    .email(validationErrorMessage.email),
  password: yup.string().required(validationErrorMessage.required),
});

const Login: FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: APP_STATE) => state);

  const theme = themes[useColorScheme() || 'dark'];
  const {
    register,
    setValue,
    trigger,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm({
    mode: 'all',

    resolver: yupResolver(schema),
  });

  const form = watch();

  useEffect(() => {
    if (state.user.logged) {
      navigation.push('Index');
    }
  }, []);

  useEffect(() => {
    const fields = ['email', 'password'];

    fields.forEach(field => register(field));
  }, [register]);

  const getMessageError = (field: string) => errors[field]?.message?.toString();

  const onSubmit = async () => {
    trigger();

    if (isValid) {
      setLoading(true);

      const data = await loginService(form as DataLogin);

      if (data.error) {
        Snackbar.show({
          text: data.message.toUpperCase(),
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: theme.foregroundColorLight,
          textColor: theme.errorColorDark,
          fontFamily: theme.fontFamily,
        });

        setLoading(false);
      } else {
        dispatch(setUser({ data: data.user, token: data.token, logged: true }));
        navigation.navigate('Index');
      }
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView style={styles.area} contentContainerStyle={styles.scroll}>
        <LoginWrapper>
          <LoginHeader>
            <TouchableOpacity
              onPress={() => !isLoading && navigation.navigate('Index')}
            >
              <Icon
                name="md-person-circle-outline"
                size={60}
                color={theme.primaryColorLight}
              />
            </TouchableOpacity>

            <LoginTitle>Log in now</LoginTitle>
          </LoginHeader>

          <View style={getVerticalSpace(0.065).space} />

          <UITextInput
            placeholderTextColor={theme.placeholderColor}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            invalid={!!errors.email}
            message={getMessageError('email')}
            onChangeText={e => setValue('email', e, { shouldValidate: true })}
          />

          <View style={getVerticalSpace(0.026).space} />

          <UITextInput
            placeholderTextColor={theme.placeholderColor}
            secureTextEntry
            invalid={!!errors.password}
            value={form.password}
            message={getMessageError('password')}
            placeholder="Password"
            onChangeText={e =>
              setValue('password', e, { shouldValidate: true })
            }
          />

          <View style={getVerticalSpace(0.026).space} />

          <TouchableOpacity
            onPress={() => !isLoading && navigation.push('Signup')}
          >
            <GoSignupText>I don't have an account</GoSignupText>
          </TouchableOpacity>

          <View style={getVerticalSpace(0.065).space} />

          <UIButton
            title="LOGIN"
            disabled={(!isValid && !isDirty) || isLoading}
            onPress={onSubmit}
          >
            {isLoading && (
              <ActivityIndicator size="small" color={theme.textColor} />
            )}
          </UIButton>
        </LoginWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
});
