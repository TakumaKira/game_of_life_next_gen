import styled from 'styled-components';

const DEFAULT_SIZE = 48;

export default function PlayControllerButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string, size?: number }>) {
  return styled(SVG)`
    width: ${props => props.size ?? DEFAULT_SIZE}px;
    height: ${props => props.size ?? DEFAULT_SIZE}px;
    cursor: pointer;
    opacity: 0.8;
    fill: #ffffff;
  `
}
