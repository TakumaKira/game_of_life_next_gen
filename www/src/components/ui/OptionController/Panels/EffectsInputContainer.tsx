import styled from "styled-components"

const INDENT_UNIT_WIDTH = 14;

const EffectsInputContainer = styled.div<{ $indent: number }>`
  margin-left: ${({ $indent }) => $indent * INDENT_UNIT_WIDTH}px;
`;
export default EffectsInputContainer