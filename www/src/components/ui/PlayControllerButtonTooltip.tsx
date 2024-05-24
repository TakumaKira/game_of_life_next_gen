import styled from 'styled-components';

const PlayControllerButtonTooltip = styled.div<{ $text: string }>`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    :after {
      position: absolute;
      top: -10%;
      transform: translateY(-100%);
      content: ${props => `"${props.$text}"`};
      color: white;
      font-family: 'Play';
      text-align: center;
    }
  }
`
export default PlayControllerButtonTooltip
