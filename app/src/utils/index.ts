import { Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('screen').height;

export const getVerticalSpace = (space: number) =>
  StyleSheet.create({
    space: {
      height: height * space,
    },
  });

export const validationErrorMessage = {
  required: 'Field is required',
  email: 'Enter a valid email address',
  password: (size: number) => `Password must contain at least ${size} digits`,
};
