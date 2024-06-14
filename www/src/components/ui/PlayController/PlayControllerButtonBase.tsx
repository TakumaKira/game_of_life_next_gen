import styled from 'styled-components';
import IconButtonBase from '../../IconButtonBase';

export default function PlayControllerButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>) {
  return styled(IconButtonBase(SVG))`
    opacity: 0.8;
    fill: #ebebeb;
    filter: drop-shadow(2px 3px 4px #00000033);
  `
}
