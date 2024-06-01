import React from 'react';
import styled from 'styled-components';
import type { RadioSelectorOption } from './types';
import RadioOption from './RadioOption';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 13px;
`

export default function RadioSelector({
  selectedKey,
  options,
  onChange
}: {
  selectedKey: string
  options: RadioSelectorOption[]
  onChange: (selectedKey: string) => void
}) {
  return (
    <Container>
      {options.map(option =>
        <RadioOption
          key={option.key}
          label={option.label}
          selected={option.key === selectedKey}
          onClick={() => onChange(option.key)}
        />
      )}
    </Container>
  )
}