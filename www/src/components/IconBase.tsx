import styled from 'styled-components';

export default function IconBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>) {
  return styled(SVG)<{ $size: number }>`
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
  `
}
