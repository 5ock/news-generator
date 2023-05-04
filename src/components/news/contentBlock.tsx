import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ReplayIcon from '@mui/icons-material/Replay'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import Selector from '../../ui/selector'

import { contentTypes } from '../../utils/const'

// type
import { IEditContent } from '../../types/news'

const ContentBox = styled(Box)<BoxProps>(() => ({
    position: 'relative',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '0 10px',
    margin: '5px 0', 
    '.delete-btn': {
        position: 'absolute',
        top: 0,
        right: 0,
        '&:hover': {
            color: 'red'
        }
    },
    '.item': {
        display: 'flex',
        width: '100%',
        // justifyContent: 'space-around',
        alignItems: 'center',
        margin: '10px 0',
        '.label': {
            width: '150px'
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

interface IContentBlockProps {
    data: IEditContent;
    onContentChange: (number:number, path: string, val:any) => void;
    onDeleteContent: (number:number) => void;
}

const ContentBlock = (props:IContentBlockProps) => {
    const { t } = useTranslation()
    const { onContentChange, onDeleteContent, data } = props

    // input error
    const [ errorMessageImage, setErrorMessageImage ] = useState<string>('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (itemPath:string, val:any) => {
        onContentChange && onContentChange(data.number, itemPath, val)
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
            
            handleChange('imgFileName', file.name)
            handleChange('imgBase64', imageBase64)            
        }
    }

    const handleDelete = () => {
        onDeleteContent && onDeleteContent(data.number)
    }

    return (
        <ContentBox>
            <IconButton className='delete-btn' onClick={handleDelete}>
                <DeleteForeverIcon />
            </IconButton>
            <Typography component='div' className='item'>
                <Typography className='label'>{t('dialog.item-types')}</Typography>
                <Selector
                    selectClassName='item-selector'
                    value={data.type}
                    autoTranslate={true}
                    options={contentTypes}
                    onChange={(val) => handleChange('type', val)}
                />
            </Typography>
            { data.type === 'img'
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
                            <Typography>{data.imgFileName ? data.imgFileName : t('dialog.hint-select-file')}</Typography>
                            { data.imgFileName && <ReplayIcon sx={{marginLeft: '20px'}} /> }
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
                        <Typography className='label'>{t('dialog.item-image-alt-zh')}</Typography>
                        <TextField
                            className='text-input'
                            value={data.altZh ? data.altZh : ''}
                            onChange={(e) => handleChange('altZh', e.target.value)}
                        />
                    </Typography>
                    <Typography component='div' className='item'>
                        <Typography className='label'>{t('dialog.item-image-alt-en')}</Typography>
                        <TextField
                            className='text-input'
                            value={data.altEn ? data.altEn : ''}
                            onChange={(e) => handleChange('altEn', e.target.value)}
                        />
                    </Typography>
                    {/* <Typography component='div' className='item'>
                        <Typography className='label'>{t('dialog.item-image-width')}</Typography>
                        <TextField
                            type="number"
                            className='text-input'
                            placeholder={t('dialog.hint-please-type-number') as string}
                            value={data.width ? data.width : ''}
                            onChange={(e) => handleChange('width', e.target.value)}
                        />
                    </Typography>
                    <Typography component='div' className='item'>
                        <Typography className='label'>{t('dialog.item-image-height')}</Typography>
                        <TextField
                            type="number"
                            className='text-input'
                            placeholder={t('dialog.hint-please-type-number') as string}
                            value={data.height ? data.height : ''}
                            onChange={(e) => handleChange('height', e.target.value)}
                        />
                    </Typography> */}
                </>)
                : (<>
                    <Typography component='div' className='item'>
                        <Typography className='label'>{t('dialog.item-text-zh')}</Typography>
                        <TextareaAutosize
                        className='textarea'
                        value={data.textZh}
                        onChange={e => handleChange('textZh', e.target.value)}
                        minRows={4}
                        style={{ width: '50%', borderColor: '#ccc', fontSize: '16px' }}
                        />
                    </Typography>
                    <Typography component='div' className='item'>
                        <Typography className='label'>{t('dialog.item-text-en')}</Typography>
                        <TextareaAutosize
                        className='textarea'
                        value={data.textEn}
                        onChange={e => handleChange('textEn', e.target.value)}
                        minRows={4}
                        style={{ width: '50%', borderColor: '#ccc', fontSize: '16px' }}
                        />
                    </Typography>
                </>)
            }
        </ContentBox>)
}

export default ContentBlock