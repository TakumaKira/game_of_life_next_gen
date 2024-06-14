import styled from "styled-components"

const INDENT_UNIT_WIDTH = 14;

const IndentContainer = styled.div<{ $indent: number }>`
  margin-left: ${({ $indent }) => $indent * INDENT_UNIT_WIDTH}px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
export default IndentContainer