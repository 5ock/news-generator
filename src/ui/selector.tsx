import React from 'react'
import _ from 'lodash'
import cx from 'classnames'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

/**
 * example
options: [
  { value: 'img', text: '圖片' },
  { value: 'text', text: '文字' }
]
 * 
 */

interface ISelectOption {
  value: string;
  text: string;
}

interface ISelectorTypes {
  value?: string;
  options?: ISelectOption[];
  firstItemText?: string;
  onChange?: (val: string) => void;
  onOpen?: () => void;
  styles?: {};
  selectClassName?: string;
}

const Selector = ({options, onChange, value, firstItemText, styles, selectClassName, onOpen}: ISelectorTypes)=> {
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    onChange && onChange(e.target.value)
  }

  let sxObj = _.merge({
  }, styles)

  return (
    <Select
      onOpen={() => onOpen && onOpen()}
      className={cx('selector', selectClassName)}
      value={value}
      onChange={handleSelectChange}
      displayEmpty
      sx={sxObj}
    >
      { options && options.length > 0 && 
        _.map(options, el => (<MenuItem value={el.value} key={el.value}>{el.text}</MenuItem>)
      )}
    </Select>
  )
}

export default Selector