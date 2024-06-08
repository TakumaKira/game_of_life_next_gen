import styled from 'styled-components';
import IconTooltipBase from './IconTooltipBase';

const CloseButtonTooltip = styled(IconTooltipBase)`
  &:hover {
    &:after {
      text-align: right;
      right: 100%;
      white-space: nowrap;
      bottom: 50%;
      transform: translateY(calc(50% - 1px));
    }
    svg {
      opacity: 0.6;
    }
  }
`
export default CloseButtonTooltip
