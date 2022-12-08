export type Theme = {
  primaryColorLight: string;
  primaryColorDark: string;
  backgroundColor: string;
  foregroundColorLight: string;
  foregroundColorDark: string;
  fontFamily: string;
  borderColor: string;
  errorColorDark: string;
  errorColorLight: string;
  textColor: string;
  placeholderColor: string;
};

export type MultiTheme = {
  [name: string]: Theme;
};
