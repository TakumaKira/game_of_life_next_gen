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
      font-size: 18px;
      text-align: right;
      white-space: nowrap;
      color: #b7b7b7;
      opacity: 0.6;
      bottom: 50%;
      transform: translateY(calc(50% - 1px));
    }
  }
`
export default CloseButtonTooltip
