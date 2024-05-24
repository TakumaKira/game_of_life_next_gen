import { createGlobalStyle } from 'styled-components';

import PlayRegular from '../../public/assets/fonts/Play/Play-Regular.ttf';
import PlayBold from '../../public/assets/fonts/Play/Play-Bold.ttf';

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
`
export default Fonts;
