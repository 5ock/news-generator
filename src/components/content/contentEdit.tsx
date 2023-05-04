import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import ContentDialog from './contentDialog'

const CusBox = styled(Typography)<BoxProps>(() => ({
    '.title-text-input': {
        'input': {
            minWidth: '600px',
            background: '#fff',
            height: '45px',
            padding: '0px 5px'
        }
    }
}))

const ContentEdit = () => {
    const { t } = useTranslation()

    const [ openContentDialog, setOpenContentDialog ] = useState<boolean>(false)

    const handleChange = (path:string, val:any) => {

    }

    return (<>
        <CusBox className='wrap'>
            <Typography component={'div'} className='title'>
                <TextField
                    className='title-text-input'
                    value={'asgfhjsergb'}
                    onChange={(e:any) => handleChange('alt', e.target.value)}
                />
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
        </CusBox>
        <ContentDialog
            open={openContentDialog}
            onCancel={() => setOpenContentDialog(false)}
            onConfirm={() => {}}
        />
    </>)
}

export default ContentEdit