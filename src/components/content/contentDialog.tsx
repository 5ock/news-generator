import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ReplayIcon from '@mui/icons-material/Replay'

import ModalDialog from '../../ui/modalDialog'
import Selector from '../../ui/selector'

import { contentTypes } from '../../utils/const'

// type
import { IContent, initialContent } from '../../types/news'

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

    // input error
    const [ errorMessageImage, setErrorMessageImage ] = useState<string>('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (itemPath:string, val:any) => {
        let newData = _.clone(contentData)
        _.set(newData, itemPath, val)
        setContentData(newData)
    }

    const handleImage = (target:any) => {
        if(!target.files || target.files.length === 0 || !fileInputRef.current)
            return

        const file = target.files[0]
        if(file.type.indexOf('image') < 0) {
            fileInputRef.current.value = ''
            handleChange('path', '')
            handleChange('imgUrl', '')
            return setErrorMessageImage(t('error.txt-upload-image') as string)
        }

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const imageBase64 = reader.result
            let newData = _.clone(contentData)
            
            _.set(newData, 'imgFileName', file.name)
            _.set(newData, 'imgBase64', imageBase64)
            setContentData(newData)
        }
    }

    const handleConfirm = () => {
        console.log(contentData)
    }

    const handleCancel = () => {
        setErrorMessageImage('')
        setContentData(initialContent)
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
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          className='icon-button'
                        >
                          <input
                            ref={fileInputRef}
                            hidden
                            accept='image/*'
                            type='file'
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleImage(e.target)}
                          />
                            <Typography>{contentData.imgFileName ? contentData.imgFileName : t('dialog.hint-select-file')}</Typography>
                            { contentData.imgFileName && <ReplayIcon sx={{marginLeft: '20px'}} /> }
                        </IconButton>
                    </Typography>
                        { errorMessageImage && <Stack sx={{
                                width: '150px',
                                margin: '0 auto',
                                'div': {
                                    padding: '2px 5px'
                                },
                                '.MuiAlert-icon': {
                                    paddingLeft: '5px',
                                },
                                '.MuiAlert-message': {
                                    paddingRight: '5px'
                                }
                            }} spacing={2}>
                            <Alert severity="error" className='alert'>{errorMessageImage}</Alert>
                        </Stack> }
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