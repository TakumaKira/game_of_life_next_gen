import styled from 'styled-components';

const DEFAULT_SIZE = 24;

export default function CheckboxButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string, size?: number }>) {
  return styled(SVG)`
    width: ${props => props.size ?? DEFAULT_SIZE}px;
    height: ${props => props.size ?? DEFAULT_SIZE}px;
  `
}
