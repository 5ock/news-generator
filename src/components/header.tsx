import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../utils/customHook'

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
    const { aNews } = useTypedSelector(state => state.global)
    const { t } = useTranslation()

    const handleExportJsonFile = () =>{
        const jsonData = JSON.stringify(aNews)
        const blob = new Blob([jsonData], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement("a")
        link.href = url
        link.download = "news.json"
        document.body.appendChild(link)
        link.click()
    }

    return (<CusHeader>
        {/* <CusButton
            className='button'
            btnText={t('global.txt-import')}
            onClick={()=>{}}
        /> */}
        <CusButton
            className='button'
            btnText={t('global.txt-export')}
            onClick={handleExportJsonFile}
        />
    </CusHeader>)
}

export default Header