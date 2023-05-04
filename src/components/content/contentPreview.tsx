import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'

const ContentPreview = () => {
    const { t } = useTranslation()

    return (<>
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
        </Typography>
    </>)
}

export default ContentPreview