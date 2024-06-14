import styled from 'styled-components';

const IconTooltipBase = styled.div<{ $text: string, $iconSize: number }>`
  width: ${props => props.$iconSize}px;
  height: ${props => props.$iconSize}px;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    &:after {
      position: absolute;
      content: ${props => `"${props.$text}"`};
      font-size: 18px;
      opacity: 0.6;
    }
  }
`
export default IconTooltipBase
