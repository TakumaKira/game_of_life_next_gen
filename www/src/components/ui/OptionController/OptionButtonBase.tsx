import styled from 'styled-components';
import ButtonBase from './ButtonBase';

export default function OptionButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>) {
  return styled(ButtonBase(SVG))`
    fill: #cfcfcf66;
    filter: drop-shadow(2px 3px 4px #00000033);
  `
}
