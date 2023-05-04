import React from 'react'
import _ from 'lodash'
import cx from 'classnames'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'

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
  onChange?: (val: string) => void;
  onOpen?: () => void;
  styles?: {};
  selectClassName?: string;
  autoTranslate?: boolean;
}

const Selector = (props: ISelectorTypes)=> {
  const {options, onChange, value, styles, selectClassName, onOpen, autoTranslate=false} = props
  const { t } = useTranslation()
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
        _.map(options, el => (<MenuItem value={el.value} key={el.value}>{autoTranslate ? t(el.text) : el.text}</MenuItem>)
      )}
    </Select>
  )
}

export default Selector