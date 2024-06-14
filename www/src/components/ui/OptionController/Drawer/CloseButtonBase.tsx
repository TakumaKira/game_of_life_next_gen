import styled from 'styled-components';
import IconButtonBase from '../../../IconButtonBase';

export default function CloseButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>) {
  return styled(IconButtonBase(SVG))`
    opacity: 0.3;
    fill: #ffffff;
  `
}
