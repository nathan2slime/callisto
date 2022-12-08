import themes from '@cars/themes';
import { UIButton, UITextInput } from '@cars/ui';
import { FC, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  SafeAreaView,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  GoLoginText,
  SignupTitle,
  SignupWrapper,
  SignupHeader,
} from './styles';
import { APP_STATE } from '../../store';
import { getVerticalSpace, validationErrorMessage } from '../../utils';
import Snackbar from 'react-native-snackbar';
import { setUser } from '../../store/actions';
import { DataSignup, signupService } from '../../services/auth';

const schema = yup.object().shape({
  name: yup.string().required(validationErrorMessage.required),
  email: yup
    .string()
    .required(validationErrorMessage.required)
    .trim()
    .email(validationErrorMessage.email),
  password: yup
    .string()
    .required(validationErrorMessage.required)
    .min(4, validationErrorMessage.password(4)),
});

const Signup: FC<NativeStackScreenProps<any>> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state: APP_STATE) => state);

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

  useEffect(() => {
    if (user.logged) {
      navigation.navigate('Index');
    }
  }, []);

  const form = watch();

  useEffect(() => {
    const fields = ['name', 'email', 'password'];

    fields.forEach(field => register(field));
  }, [register]);

  const getMessageError = (field: string) => errors[field]?.message?.toString();

  const onSubmit = async () => {
    trigger();

    if (isValid) {
      setLoading(true);

      const data = await signupService(form as DataSignup);

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
        <SignupWrapper>
          <SignupHeader>
            <TouchableOpacity
              onPress={() => !isLoading && navigation.navigate('Index')}
            >
              <Icon
                name="md-person-circle-outline"
                size={60}
                color={theme.primaryColorLight}
              />
            </TouchableOpacity>

            <SignupTitle>Signup</SignupTitle>
          </SignupHeader>

          <StatusBar
            backgroundColor={theme.primaryColorDark}
            barStyle="dark-content"
          />

          <View style={getVerticalSpace(0.065).space} />

          <UITextInput
            placeholderTextColor={theme.placeholderColor}
            placeholder="Name"
            keyboardType="default"
            value={form.name}
            invalid={!!errors.name}
            message={getMessageError('name')}
            onChangeText={e => setValue('name', e, { shouldValidate: true })}
          />

          <View style={getVerticalSpace(0.026).space} />

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
            onPress={() => !isLoading && navigation.push('Login')}
          >
            <GoLoginText>I already have an account</GoLoginText>
          </TouchableOpacity>

          <View style={getVerticalSpace(0.065).space} />

          <UIButton
            title="SIGNUP"
            disabled={(!isValid && !isDirty) || isLoading}
            onPress={onSubmit}
          >
            {isLoading && (
              <ActivityIndicator size="small" color={theme.textColor} />
            )}
          </UIButton>
        </SignupWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
});
