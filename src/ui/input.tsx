import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import _ from 'lodash'

interface IInputProp {
  id?: string;
  onChange: (val:string) => void;
  sx?: {};
  label: string;
  placeholder?: string;
  autoComplete?: string;
  type?: string;
  required?: boolean;
  errorMessage?: string;
  validatePattern?: RegExp;
  className?: string;
}

const CusTextField = styled(TextField)<TextFieldProps>(() => ({
  width: '80vw',
  'label': {
    color: '#fff',
    '&.Mui-focused': {
      color: '#fff',
    }
  },
  '.MuiOutlinedInput-input': {
    color: '#fff',
  },
  '& fieldset': {
    borderColor: '#eee !important',
  },
}))

const Input = (props:IInputProp) => {
  const { id, onChange, sx, label, placeholder, autoComplete, 
    type=undefined, required=false, errorMessage='', validatePattern, className } = props

  let inputStyle = sx
  if(errorMessage) {
    _.merge(inputStyle, {
      'label': {
        '&.Mui-error': {
          color: '#fff',
        }
      },
      '.MuiOutlinedInput-input': {
        color: '#d32f2f',
      },
    })
  }

  return (<CusTextField
    error={!_.isEmpty(errorMessage)}
    helperText={errorMessage}
    id={id}
    className={className}
    type={type}
    required={required}
    fullWidth
    InputLabelProps={{ shrink: true }}
    label={label}
    placeholder={placeholder}
    autoComplete={autoComplete}
    onChange={e => onChange(e.target.value)}
    sx={inputStyle}
  />)
}

export default Input