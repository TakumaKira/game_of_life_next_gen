import styled from 'styled-components';
import ButtonBase from './ButtonBase';

const DEFAULT_SIZE = 30;

export default function CloseButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>) {
  return styled(ButtonBase(SVG))`
    opacity: 0.3;
    fill: #ffffff;
  `
}
