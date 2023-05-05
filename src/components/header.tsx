import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../utils/customHook'
import moment from 'moment'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Button from '@mui/material/Button'
import ReplayIcon from '@mui/icons-material/Replay'

import CusButton from '../ui/button'

// type
import { INewsItem } from '../types/news'

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

    const [ importFileName, setImportFileName ] = useState<string>('')
    const [ importFileNews, setImportFileNews ] = useState<INewsItem[]>([])


    const handleExportJsonFile = () =>{
        const arrayData = [ ...importFileNews, aNews]
        const jsonData = JSON.stringify(arrayData)
        const blob = new Blob([jsonData], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        
        const link = document.createElement("a")
        link.href = url
        link.download = importFileName ? importFileName : `news-${moment().format('YYYY-MM-DD')}.json`
        document.body.appendChild(link)
        link.click()
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
      
        const reader = new FileReader()
        reader.onload = (event) => {
          const contents = event.target?.result as string
          const data = JSON.parse(contents) as INewsItem
          if(Array.isArray(data)) {
            setImportFileName(file.name)
            setImportFileNews(data)
          }
        }
        reader.readAsText(file)
    }

    useEffect(() =>{
        console.log(importFileNews)
    }, [importFileNews])

    return (<CusHeader>
        <Button
            variant="contained"
            component="label"
            className='button btn-import'
        >
            {!importFileName ? t('global.txt-import') : <>{importFileName}<ReplayIcon /></>}
            <input
                type="file"
                hidden
                onChange={handleFileSelect}
                accept="application/json"
            />
        </Button>
        <CusButton
            className='button'
            btnText={t('global.txt-export')}
            onClick={handleExportJsonFile}
        />
    </CusHeader>)
}

export default Header