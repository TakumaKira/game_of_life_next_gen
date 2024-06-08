import styled from 'styled-components';
import IconBase from './IconBase';

export default function IconButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>) {
  return styled(IconBase(SVG))`
    cursor: pointer;
  `
}