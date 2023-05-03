import React from 'react'

import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'

interface IInputProp {
  className?: string;
  btnText: string;
  type?: 'button'|'submit'|'reset'|undefined;
  sx?: {};
  onClick: () => void;
}

const StyledButton = styled(Button)<ButtonProps>(() => ({
  fontSize: '16px',
  width: '60vw',
}))

const CusButton = (props:IInputProp) => {
  const { className, btnText, type='button', sx, onClick } = props

  return (<StyledButton
    className={className}
    variant="contained" 
    type={type}
    sx={sx}
    onClick={onClick}
  >{btnText}</StyledButton>)
}

export default CusButton