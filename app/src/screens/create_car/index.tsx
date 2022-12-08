import themes from '@cars/themes';
import { UIButton, UITextInput } from '@cars/ui';
import { FC, useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CreateCarTitle, CreateCarWrapper } from './styles';
import { setUser } from '../../store/actions';
import { APP_STATE } from '../../store';
import { getVerticalSpace, validationErrorMessage } from '../../utils';
import {
  createCarService,
  CreateCarData,
  getCarById,
  updateCarService,
} from '../../services/cars';

const schema = yup.object().shape({
  name: yup.string().required(validationErrorMessage.required),
  price: yup.string().required(validationErrorMessage.required),
  brand: yup.string().required(validationErrorMessage.required),
  photo: yup.string().required(validationErrorMessage.required),
  model: yup.string().required(validationErrorMessage.required),
});

const CreateCar: FC<NativeStackScreenProps<any>> = ({ navigation, route }) => {
  const carId = route.params?.id;
  const fields = ['name', 'brand', 'photo', 'price', 'model'];

  const [isLoading, setLoading] = useState(false);
  const { user } = useSelector((state: APP_STATE) => state);
  const theme = themes[useColorScheme() || 'dark'];

  const {
    register,
    setValue,
    trigger,
    formState: { errors, isValid, isDirty },
    watch,
    reset,
  } = useForm({
    mode: 'all',

    resolver: yupResolver(schema),
  });

  const form = watch();

  useEffect(() => {
    if (!user.data?.admin) {
      navigation.push('Index');
    }
  }, []);

  useEffect(() => {
    if (carId) {
      fillingForm();
    }
  }, [carId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      reset();
      setLoading(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    fields.forEach(field => register(field));
  }, [register]);

  const fillingForm = async () => {
    const { data } = await getCarById(parseInt(carId));

    fields.forEach(field => {
      setValue(field, `${data[field]}`, { shouldValidate: true });
    });
  };

  const getMessageError = (field: string) => errors[field]?.message?.toString();

  const onSubmit = async () => {
    trigger();

    if (isValid) {
      setLoading(true);

      const { data } = carId
        ? await updateCarService(form as CreateCarData, carId, `${user.token}`)
        : await createCarService(form as CreateCarData, `${user.token}`);

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
        setLoading(false);
        navigation.push('Index');
      }
    }
  };

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView style={styles.area} contentContainerStyle={styles.scroll}>
        <CreateCarWrapper>
          <CreateCarTitle>{carId ? 'Edit car' : 'New car'}</CreateCarTitle>

          <View style={getVerticalSpace(0.065).space} />

          <UITextInput
            placeholderTextColor={theme.placeholderColor}
            placeholder="Name"
            label="Name"
            keyboardType="default"
            value={form.name}
            invalid={!!errors.name}
            message={getMessageError('name')}
            onChangeText={e => setValue('name', e, { shouldValidate: true })}
          />
          <View style={getVerticalSpace(0.026).space} />

          <UITextInput
            placeholderTextColor={theme.placeholderColor}
            invalid={!!errors.brand}
            value={form.brand}
            label="Brand"
            message={getMessageError('brand')}
            placeholder="Brand"
            onChangeText={e => setValue('brand', e, { shouldValidate: true })}
          />
          <View style={getVerticalSpace(0.026).space} />

          <UITextInput
            placeholderTextColor={theme.placeholderColor}
            invalid={!!errors.photo}
            label="Photo"
            value={form.photo}
            message={getMessageError('photo')}
            placeholder="Photo"
            onChangeText={e => setValue('photo', e, { shouldValidate: true })}
          />
          <View style={getVerticalSpace(0.026).space} />

          <UITextInput
            placeholderTextColor={theme.placeholderColor}
            invalid={!!errors.model}
            label="Model"
            value={form.model}
            message={getMessageError('model')}
            placeholder="Model"
            onChangeText={e => setValue('model', e, { shouldValidate: true })}
          />
          <View style={getVerticalSpace(0.026).space} />

          <UITextInput
            placeholderTextColor={theme.placeholderColor}
            keyboardType="decimal-pad"
            invalid={!!errors.price}
            value={form.price}
            label="Price"
            message={getMessageError('price')}
            placeholder="Price"
            onChangeText={e => setValue('price', e, { shouldValidate: true })}
          />
          <View style={getVerticalSpace(0.026).space} />

          <UIButton
            title={carId ? 'Save' : 'Create'}
            disabled={(!isValid && !isDirty) || isLoading}
            onPress={onSubmit}
          >
            {isLoading && (
              <ActivityIndicator size="small" color={theme.textColor} />
            )}
          </UIButton>
        </CreateCarWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateCar;

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
});
