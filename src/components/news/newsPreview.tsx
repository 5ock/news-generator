import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useTypedSelector } from '../../utils/customHook'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'

// type
import { IArticle, initialArticle, IContent } from '../../types/news'

interface INewsPreviewProps {
    locales: 'zh'|'en'
}

const CusBox = styled(Box)<BoxProps>(() => ({
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
    '.date': {
        paddingBottom: '40px',
        paddingLeft: '50px'
    },
    '.content': {
        marginBottom: '20px',
        paddingLeft: '50px'
    }
}))

const NewsPreview = (props:INewsPreviewProps) => {
    const { aNews } = useTypedSelector(state => state.global)

    const { locales } = props

    const [ article, setArticle ] = useState<IArticle>(initialArticle)
    const [ date, setDate ] = useState<string>('')

    useEffect(() => {
        if(aNews.uuid === -1)
            return

        setDate(aNews.date)

        if(locales === 'zh') {
            if(!aNews.zh)
                return setArticle(initialArticle)

            setArticle(aNews.zh)
        } else {
            if(!aNews.en)
                return setArticle(initialArticle)

            setArticle(aNews.en)
        }

    }, [locales, aNews])

    if(aNews.uuid === -1)
        return null

    return (<CusBox component={'div'} className='wrap'>
        <Typography component={'div'} className='title'>
            {article.title}
        </Typography>
        <Typography component={'div'} className='date'>
            {date}
        </Typography>
        <Typography component={'div'} className='content'>
            {
                _.map(article.content, (el:IContent, key:number) => {
                    return (<Typography key={`preview-content-${key}`} component={'div'}>
                        {
                            el.type === 'img'
                            ? (<Typography
                                key={`preview-content-${key}`}
                                component={'div'}
                                className='content-image'
                            >
                                <CardMedia
                                    component='img'
                                    alt={el.alt}
                                    src={el.imgBase64}
                                    sx={{width: '100%'}}
                                />
                            </Typography>)
                            : (<Typography
                                key={`preview-content-${key}`}
                                component={'div'}
                                className='content-text'
                            
                            >
                                {el.text}
                            </Typography>)
                        }
                    </Typography>)
                })
            }
        </Typography>
    </CusBox>)
}

export default NewsPreview