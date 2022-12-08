import { Theme } from '@cars/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
