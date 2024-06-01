import styled from 'styled-components';

const DEFAULT_SIZE = 36;

export default function OptionButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string, size?: number }>) {
  return styled(SVG)`
    width: ${props => props.size ?? DEFAULT_SIZE}px;
    height: ${props => props.size ?? DEFAULT_SIZE}px;
    cursor: pointer;
    fill: #cfcfcf66;
    filter: drop-shadow(2px 3px 4px #00000033);
    &:hover {
      fill: #cfcfcf99;
    }
  `
}
