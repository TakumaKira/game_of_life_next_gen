import styled from 'styled-components';

const CloseButtonTooltip = styled.div<{ $text: string }>`
  width: 36px;
  height: 36px;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    &:after {
      position: absolute;
      right: 100%;
      content: ${props => `"${props.$text}"`};
      font-family: 'Play';
      font-size: 18px;
      text-align: right;
      white-space: nowrap;
      color: #8b8b8b;
      opacity: 0.8;
    }
  }
`
export default CloseButtonTooltip
