import React from 'react'
import { useTranslation } from 'react-i18next'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

import CusButton from '../ui/button'

const CusHeader = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px',
    '.button': {
        width: '150px'
    },
}))

const Header = () =>{
    const { t } = useTranslation()

    return (<CusHeader>
        <CusButton
            className='button'
            btnText={t('global.txt-import')}
            onClick={()=>{}}
        />
        <CusButton
            className='button'
            btnText={t('global.txt-export')}
            onClick={()=>{}}
        />
    </CusHeader>)
}

export default Header