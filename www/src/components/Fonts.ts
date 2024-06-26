import { createGlobalStyle } from 'styled-components';

import PlayRegular from '../assets/fonts/Play/Play-Regular.ttf';
import PlayBold from '../assets/fonts/Play/Play-Bold.ttf';

const Fonts = createGlobalStyle`
@font-face {
  font-family: 'Play';
  font-weight: normal;
  font-style: normal;
  font-display: swap;
  src: url(${PlayRegular}) format('truetype');
}
@font-face {
  font-family: 'Play';
  font-weight: bold;
  font-style: normal;
  font-display: swap;
  src: url(${PlayBold}) format('truetype');
}
* {
  font-family: 'Play';
}
`
export default Fonts;
