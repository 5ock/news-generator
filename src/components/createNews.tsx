import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import ContentDialog from './contentDialog'

// type
import { IContent } from '../types/news'

const CusBox = styled(Box)<BoxProps>(() => ({
    marginTop: '40px',
    fontZize: '16px',
    width: '100%',
    paddingBottom: '10px',
    '.wrap': {
        width: '850px',
        margin: '0 auto',
        borderRight: '1px dotted #ccc',
        borderLeft: '1px dotted #ccc',
        borderBottom: '1px dotted #ccc',
        '.title': {
            display: 'inline-block',
            padding: '18px 0',
            backgroundColor: '#000',
            color: '#fff',
            fontWeight: '400',
            fontSize: '30px',
            textAlign: 'center',
            marginBottom: '30px',
            width: '100%'
        },
        '.btn-add': {
            width: '200px',
            borderWidth: '2px',
            margin: '0 auto',
            display: 'flex',
            
            '&:hover': {
                borderWidth: '2px',
            }
        }
    }
}))

const CreateNews = () => {
    const { t } = useTranslation()
    const [ openContentDialog, setOpenContentDialog ] = useState<boolean>(false)

    const [ contents, setContents ] = useState<IContent[]>([])


    return (<>
        <CusBox>
            <Typography component={'div'} className='wrap'>
                <Typography component={'div'} className='title'>
                    title
                </Typography>
                <Typography component={'div'} className='date'>
                    date
                </Typography>
                <Typography component={'div'} className='content'>
                    content
                </Typography>
                <Button
                    title={t('hint.text-create-content') as string}
                    variant="outlined"
                    className='btn-add'
                    onClick={() => setOpenContentDialog(true)} >
                    <AddIcon />
                </Button>
            </Typography>
        </CusBox>
        <ContentDialog
            open={openContentDialog}
            onCancel={() => setOpenContentDialog(false)}
            onConfirm={() => {}}
        />
    </>)
}

export default CreateNews