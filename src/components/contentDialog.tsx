import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Input from '@mui/material/Input'
import TextField from '@mui/material/TextField'

import ModalDialog from '../ui/modalDialog'
import CusInput from '../ui/input'
import Selector from '../ui/selector'

import { contentTypes } from '../utils/const'

// type
import { IContent, initialContent } from '../types/news'

const ContentBox = styled(Box)<BoxProps>(() => ({
    '.item': {
        display: 'flex',
        width: '100%',
        // justifyContent: 'space-around',
        alignItems: 'center',
        margin: '10px 0',
        '.label': {
            width: '120px'
        },
        '.item-selector': {
            height: '30px',
            width: '100px'
        },
        '.text-input input': {
            padding: '5px'
        }
    }
}))

interface IContentDialogProps {
    data?: IContent;
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ContentDialog = (props:IContentDialogProps) => {
    const { t } = useTranslation()
    const { open, onConfirm, onCancel, data } = props

    const [ contentData, setContentData ] = useState<IContent>(initialContent)

    const handleChange = (itemPath:string, val:any) => {
        let newData = _.clone(contentData)
        _.set(newData, itemPath, val)
        setContentData(newData)
    }

    const handleConfirm = () => {
        console.log(contentData)
    }

    const handleCancel = () => {

        onCancel && onCancel()
    }

    useEffect(() => {
        if(data && data.type) {
            setContentData(data)
        }
    }, [data])


    return (<ModalDialog
        open={open}
        title={t('dialog.title-create-content')}
        dialogActionDom={<Typography sx={{'button': {fontSize: '18px', fontFamily:'Noto Sans TC', fontWeight: '500'}}}>
            <Button onClick={handleCancel}>{t('dialog.btn-cancel')}</Button>
            <Button onClick={handleConfirm}>{t('dialog.btn-confirm')}</Button>
          </Typography>
        }
    >
        <ContentBox>
            <Typography component='div' className='item'>
                <Typography className='label'>{t('dialog.item-types')}</Typography>
                <Selector
                    selectClassName='item-selector'
                    value={contentData.type}
                    autoTranslate={true}
                    options={contentTypes}
                    onChange={(val) => handleChange('type', val)}
                />
            </Typography>
            { contentData.type === 'img'
                ? (<>
                    <Typography component='div' className='item'>
                        <Typography className='label'>{t('dialog.item-upload-image')}</Typography>
                        <Input
                            type='file'
                            sx={{
                                position: 'unset'
                            }}
                        />
                    </Typography>
                    <Typography component='div' className='item'>
                        <Typography className='label'>{t('dialog.item-image-alt')}</Typography>
                        <TextField
                            className='text-input'
                            value={contentData.alt ? contentData.alt : ''}
                            onChange={(e) => handleChange('alt', e.target.value)}
                        />
                    </Typography>
                    <Typography component='div' className='item'>
                        <Typography className='label'>{t('dialog.item-image-width')}</Typography>
                        <TextField
                            type="number"
                            className='text-input'
                            placeholder={t('dialog.hint-please-type-number') as string}
                            value={contentData.width ? contentData.width : ''}
                            onChange={(e) => handleChange('width', e.target.value)}
                        />
                    </Typography>
                    <Typography component='div' className='item'>
                        <Typography className='label'>{t('dialog.item-image-height')}</Typography>
                        <TextField
                            type="number"
                            className='text-input'
                            placeholder={t('dialog.hint-please-type-number') as string}
                            value={contentData.height ? contentData.height : ''}
                            onChange={(e) => handleChange('height', e.target.value)}
                        />
                    </Typography>
                </>)
                : (<Typography component='div' className='item'>
                    <Typography className='label'>{t('dialog.item-text')}</Typography>
                    <TextareaAutosize
                    className='textarea'
                    value={contentData.text}
                    onChange={e => handleChange('text', e.target.value)}
                    minRows={4}
                    style={{ width: '50%', borderColor: '#ccc', fontSize: '16px' }}
                    />
                </Typography>)
            }
        </ContentBox>
    </ModalDialog>)
}

export default ContentDialog