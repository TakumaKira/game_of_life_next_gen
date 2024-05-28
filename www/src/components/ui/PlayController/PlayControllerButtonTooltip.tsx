import styled from 'styled-components';

const PlayControllerButtonTooltip = styled.div<{ $text: string }>`
  width: 48px;
  height: 48px;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    &:after {
      position: absolute;
      bottom: 110%;
      content: ${props => `"${props.$text}"`};
      font-family: 'Play';
      font-size: 18px;
      text-align: center;
      color: #8b8b8b;
      opacity: 0.8;
    }
  }
`
export default PlayControllerButtonTooltip
