import styled from 'styled-components';
import IconTooltipBase from '../OptionController/IconTooltipBase';

const PlayControllerButtonTooltip = styled(IconTooltipBase)`
  &:hover {
    &:after {
      text-align: center;
      bottom: 110%;
    }
  }
`
export default PlayControllerButtonTooltip
