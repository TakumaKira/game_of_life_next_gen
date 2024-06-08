import { CloseSVG } from '@/components/SVG';
import React from 'react';
import styled from 'styled-components';
import CloseButtonTooltip from './CloseButtonTooltip';
import CloseButtonBase from './CloseButtonBase';
import DrawerTitle from './DrawerTitle';

const OPEN_CLOSE_DURATION = 300;

const Container = styled.div<{ $width: number, $delayedwidth: number }>`
  position: fixed;
  top: 0;
  height: 100vh;
  left: calc(100vw - ${props => props.$width}px);
  width: ${props => props.$delayedwidth}px;
  transition: left ${_ => OPEN_CLOSE_DURATION * 0.001}s ease-in-out;
  background-color: #00000044;
  backdrop-filter: blur(20px);
  z-index: 2;
  display: flex;
  flex-direction: column;
`
const titleLayout: React.CSSProperties = {
  margin: '32px 36px',
}
const ChildrenContainer = styled.div`
  min-height: 0;
`
const CloseIcon = CloseButtonBase(CloseSVG)
const closeButtonPosition: React.CSSProperties = {
  position: 'absolute',
  top: 12,
  right: 12,
}

export default function Drawer({
  title,
  children,
  width,
  onClose,
}: {
  title: string
  children: React.ReactNode
  width: number
  onClose: () => void
}) {
  const [delayedTitle, setDelayedTitle] = React.useState(title);
  React.useEffect(() => {
    if (title.length > 0) {
      setDelayedTitle(title)
      return
    }
    setTimeout(() => setDelayedTitle(title), OPEN_CLOSE_DURATION)
  }, [title]);
  const [delayedChildren, setDelayedChildren] = React.useState<React.ReactNode>(children);
  React.useEffect(() => {
    if (children !== null) {
      setDelayedChildren(children)
      return
    }
    setTimeout(() => setDelayedChildren(children), OPEN_CLOSE_DURATION)
  }, [children]);
  const [delayedwidth, setDelayedwidth] = React.useState(width);
  React.useEffect(() => {
    if (width > 0) {
      setDelayedwidth(width)
      return
    }
    setTimeout(() => setDelayedwidth(width), OPEN_CLOSE_DURATION)
  }, [width]);
  return (
    <Container $width={width} $delayedwidth={delayedwidth}>
      {delayedChildren &&
        <DrawerTitle style={titleLayout}>
          {delayedTitle}
        </DrawerTitle>
      }
      {delayedChildren &&
        <ChildrenContainer>
          {delayedChildren}
        </ChildrenContainer>
      }
      {delayedChildren &&
        <CloseButtonTooltip $text="Close" $iconSize={36} onClick={onClose} style={{...closeButtonPosition}}>
          <CloseIcon $size={30} />
        </CloseButtonTooltip>
      }
    </Container>
  )
}