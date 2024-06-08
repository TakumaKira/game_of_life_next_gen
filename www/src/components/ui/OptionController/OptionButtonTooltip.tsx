import styled from 'styled-components';

const OptionButtonTooltip = styled.div<{ $text: string }>`
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
      right: 120%;
      content: ${props => `"${props.$text}"`};
      font-size: 18px;
      text-align: right;
      white-space: nowrap;
      color: #b7b7b7;
      opacity: 0.6;
    }
  }
`
export default OptionButtonTooltip
