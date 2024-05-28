import styled from 'styled-components';

const DEFAULT_WIDTH = 170;

const Button = styled.button<{ $width?: number, $height?: number }>`
  width: ${props => props.$width || DEFAULT_WIDTH}px;
  height: ${props => props.$height ? `${props.$height}px` : undefined};
  background: transparent;
  border: 1px solid #ffffff33;
  border-radius: 2px;
  font-family: 'Play';
  color: #ffffff77;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #ffffff11;
  }
  transition: background 0.2s;
`
export default Button