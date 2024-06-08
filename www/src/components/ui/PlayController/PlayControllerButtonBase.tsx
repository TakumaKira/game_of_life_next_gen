import styled from 'styled-components';
import ButtonBase from '../OptionController/ButtonBase';

export default function PlayControllerButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>) {
  return styled(ButtonBase(SVG))`
    opacity: 0.8;
    fill: #ebebeb;
    filter: drop-shadow(2px 3px 4px #00000033);
  `
}
