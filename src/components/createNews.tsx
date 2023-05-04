import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Button from '@mui/material/Button'

// import ContentEdit from './content/contentEdit'
// import ContentPreview from './content/contentPreview'
import NewsDialog from './news/newsDialog'
import NewsPreview from './news/newsPreview'
import NoticeDialog from '../ui/noticeDialog'

// type
import { initialNews } from '../types/news'

// redux
import { setANews } from '../redux/global'

const CusBox = styled(Box)<BoxProps>(() => ({
    fontSize: '16px',
    width: '100%',
    paddingBottom: '10px',
    '.news-header': {
        height: '40px',
        textAlign: 'center',
        '.btn': {
            height: '30px',
            margin: '5px 10px',
            fontSize: '16px'
        }
    }
}))

const CreateNews = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [ newsMode, setNewsMode ] = useState<string>('')
    const [ noticeMessage, setNoticeMessage ] = useState<string>('')
    const [ locales, setLocales ] = useState<'zh'|'en'>('zh')

    const handleCreateBtnClick = () => {
        setNewsMode('create')
        // setNoticeMessage(t('hint.text-create-will-clear-data') as string)
    }

    const handleNew = () => {
        dispatch(setANews(initialNews))
        setNoticeMessage('')
        setNewsMode('edit')
    }

    const handlePreview = () => {
        if(newsMode !== 'preview')
            setNewsMode('preview')

        setLocales(locales === 'zh' ? 'en' : 'zh')
    }

    return (<>
        <CusBox>
            <Typography component={'div'} className='news-header'>
                <Button
                    title={t('hint.text-create-content') as string}
                    variant="outlined"
                    className='btn'
                    onClick={handleCreateBtnClick} >
                    {t('global.btn-create')}
                </Button>
                <Button
                    title={t('hint.text-edit-content') as string}
                    variant="outlined"
                    className='btn'
                    onClick={() => setNewsMode('edit')} >
                    {t('global.btn-edit')}
                </Button>
                <Button
                    title={t('hint.text-edit-content') as string}
                    variant="outlined"
                    className='btn'
                    onClick={handlePreview} >
                    {locales === 'en' ? t('global.btn-preview-zh') : t('global.btn-preview-en')}
                </Button>
            </Typography>
            <NewsPreview locales={locales} />
            { (newsMode === 'edit' || newsMode === 'create') && <NewsDialog
                mode={newsMode}
                onCancel={() => setNewsMode('preview')} />}
        </CusBox>
        { noticeMessage && <NoticeDialog
            noticeMessage={noticeMessage}
            onConfirm={handleNew}
            onCancel={() => setNoticeMessage('')}
        />}
    </>)
}

export default CreateNews