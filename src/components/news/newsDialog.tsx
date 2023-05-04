import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../utils/customHook'
import _ from 'lodash'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import 'flatpickr/dist/l10n/zh-tw.js'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'

import ModalDialog from '../../ui/modalDialog'

// type
import { IContent, IEditContent, initialContent, INewsItem, initialNews, IArticle, initialArticle } from '../../types/news'
import ContentBlock from './contentBlock'

// redux
import { setANews } from '../../redux/global'

const NewsBox = styled(Box)<BoxProps>(() => ({
    '.item': {
        display: 'flex',
        width: '100%',
        // justifyContent: 'space-around',
        alignItems: 'center',
        margin: '10px 0',
        '&.item-content': {
            display: 'flex',
            flexDirection: 'column',
        },
        '.label': {
            width: '150px'
        },
        '.text-input input': {
            width: '250px',
            padding: '5px'
        },
        '.flatpickr-input': {
            width: '236px',
            fontSize: '16px',
            padding: '0 10px',
            height: '27px'
        }
    }
}))

interface INewsDialogProps {
    data?: INewsItem;
    onCancel?: () => void;
    mode: string;
}

const NewsDialog = (props:INewsDialogProps) => {
    const dispatch = useDispatch()
    const { aNews } = useTypedSelector(state => state.global)
    const { t } = useTranslation()
    const { onCancel, mode } = props

    const [ newsData, setNewsData ] = useState<INewsItem>(initialNews)
    const [ contentList, setContentList ] = useState<IEditContent[]>([])

    const handleConfirm = () => {
        let newData = _.clone(newsData)
        if(newData.uuid === -1)
            newData.uuid = moment().valueOf()
        dispatch(setANews(newData))

        handleCancel()
    }

    const handleCancel = () => {
        setNewsData(initialNews)
        setContentList([])
        onCancel && onCancel()
    }

    const handleChange = (path:string, val:any) => {
        const newData = _.clone(newsData)
        if(path === 'date')
            _.set(newData, path, moment(val).format('YYYY-MM-DD'))
        else 
            _.set(newData, path, val)
        setNewsData(newData)
    }

    const handleContentChange = (number:number, path:string, val:any) => {
        let newContentList = _.clone(contentList)
        let item = _.find(newContentList, (el:IEditContent) => el.number === number)
        if(!item)
            return

        _.set(item, path, val)
        setContentList(newContentList)
    }
    
    const handleContentDelete = (number:number) => {
        let newContentList = _.clone(contentList)
        newContentList = _.filter(newContentList, (el:IEditContent) => el.number !== number)
        setContentList(newContentList)
    }

    const handleAddCotnent = () =>{
        const newContentList = _.clone(contentList)
        const newContent = _.clone(initialContent)
        newContent.number = newContentList.length
        setContentList([...newContentList, newContent])
    }

    useEffect(() => {
        const newData = _.clone(newsData)
        if(contentList.length === 0) {
            if(newData.en)
                newData.en.content = []
            if(newData.zh)
                newData.zh.content = []

            return setNewsData(newData)
        }

        let contentsZh:any[] = []
        let contentsEn:any[] = []
        _.map(contentList, (el:IEditContent) => {
            let itemZh = {}
            let itemEn = {}
            _.map(el, (val:any, key:string) => {
                if(key.indexOf('Zh') >= 0)
                    _.set(itemZh, _.replace(key, 'Zh', ''), val)
                else if(key.indexOf('En') >= 0)
                    _.set(itemEn, _.replace(key, 'En', ''), val)
                else {
                    _.set(itemZh, key, val)
                    _.set(itemEn, key, val)
                }
            })
            contentsZh.push(itemZh)
            contentsEn.push(itemEn)
        })

        let zhArticle:IArticle = _.clone(initialArticle)
        let enArticle:IArticle = _.clone(initialArticle)
        _.set(zhArticle, 'title', newData.zh?.title)
        _.set(zhArticle, 'content', contentsZh)
        _.set(enArticle, 'title', newData.en?.title)
        _.set(enArticle, 'content', contentsEn)
        _.set(newData, 'zh', zhArticle)
        _.set(newData, 'en', enArticle)
        setNewsData(newData)
    }, [contentList])

    useEffect(() => {
        if(mode === 'create')
            return
        
        if(aNews.uuid !== -1) {
            setNewsData(aNews)

            if(aNews.en && aNews.zh && aNews.en.content && aNews.zh.content) {
                let cl:IEditContent[] = []
                for(let i=0; i<aNews.en.content.length; i++) {
                    let en = aNews.en.content[i]
                    let zh = aNews.zh.content[i]
                    let item:IEditContent = _.clone(initialContent)
                    item.number = en.number
                    item.type = en.type
                    if(en.type === 'img') {
                        item.imgFileName = en.imgFileName
                        item.imgBase64 = en.imgBase64

                        item.altEn = en.alt
                        item.altZh = zh.alt
                    } else {
                        item.textZh = en.text
                        item.textEn = zh.text
                    }
                    cl.push(item)
                }
                setContentList(cl)
            }
        }
    }, [aNews])

    if(mode === 'edit' && aNews.uuid === -1)
        return null

    return (<ModalDialog
        sx={{
            '.MuiDialogContent-root': {
                paddingTop: '0px'
            }
        }}
        open={true}
        title={mode === 'edit' ? t('dialog.title-edit-news') : t('dialog.title-create-news')}
        dialogActionDom={<Typography sx={{'button': {fontSize: '18px', fontFamily:'Noto Sans TC', fontWeight: '500'}}}>
            <Button onClick={handleCancel}>{t('dialog.btn-cancel')}</Button>
            <Button onClick={handleConfirm}>{t('dialog.btn-confirm')}</Button>
          </Typography>
        }
    >
        <NewsBox>
            <Typography component='div' className='item'>
                <Typography className='label'>{t('dialog.itme-news-title-zh')}</Typography>
                <TextField
                    className='text-input'
                    value={newsData.zh?.title ? newsData.zh.title : ''}
                    onChange={(e) => handleChange('zh.title', e.target.value)}
                />
            </Typography>
            <Typography component='div' className='item'>
                <Typography className='label'>{t('dialog.itme-news-title-en')}</Typography>
                <TextField
                    className='text-input'
                    value={newsData.en?.title ? newsData.en.title : ''}
                    onChange={(e) => handleChange('en.title', e.target.value)}
                />
            </Typography>
            <Typography component='div' className='item'>
                <Typography className='label'>{t('dialog.itme-publish-date')}</Typography>
                <Flatpickr
                    value={newsData.date}
                    onChange={(date:Date[]) => handleChange('date', date[0])}
                    options={{
                        dateFormat: 'Y-m-d',
                        allowInput: false
                    }}
                />
            </Typography>
            <Typography component='div' className='item item-content'>
            { contentList.length > 0 
                && _.map(contentList, (data:IContent) => {

                    return (<ContentBlock
                        key={`content-${data.number}`}
                        data={data}
                        onContentChange={handleContentChange}
                        onDeleteContent={handleContentDelete}
                    />)
                })
            }
            </Typography>
            <Button
                title={t('hint.text-create-content') as string}
                variant="outlined"
                className='btn-add'
                onClick={handleAddCotnent}
            >
                <AddIcon />
            </Button>
        </NewsBox>
    </ModalDialog>)
}

export default NewsDialog