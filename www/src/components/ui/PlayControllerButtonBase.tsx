import styled from 'styled-components';

export default function PlayControllerButtonBase(SVG: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>) {
  return styled(SVG)`
    width: 48px;
    height: 48px;
    cursor: pointer;
  `
}
