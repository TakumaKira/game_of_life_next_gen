import styled from 'styled-components';
import IconTooltipBase from '../../IconTooltipBase';

const OptionButtonTooltip = styled(IconTooltipBase)`
  &:hover {
    &:after {
      text-align: right;
      right: 120%;
      white-space: nowrap;
      color: #b7b7b7;
    }
    svg {
      fill: #cfcfcf99;
    }
  }
`
export default OptionButtonTooltip
