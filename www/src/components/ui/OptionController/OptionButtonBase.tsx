import styled from 'styled-components';

const DEFAULT_SIZE = 36;

export default function OptionButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string, size?: number }>) {
  return styled(SVG)`
    width: ${props => props.size ?? DEFAULT_SIZE}px;
    height: ${props => props.size ?? DEFAULT_SIZE}px;
    cursor: pointer;
    opacity: 0.3;
    &:hover {
      opacity: 0.6;
    }
    fill: #ffffff;
  `
}
