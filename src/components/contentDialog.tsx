import React from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import ModalDialog from '../ui/modalDialog'
import Selector from '../ui/selector'

import { contentTypes } from '../utils/const'

interface IContentDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ContentDialog = (props:IContentDialogProps) => {
    const { t } = useTranslation()
    const { open, onConfirm, onCancel } = props

    const handleConfirm = () => {

    }

    const handleCancel = () => {

        onCancel && onCancel()
    }

    return (<ModalDialog
        open={open}
        title={t('dialog.title-create-content')}
        dialogActionDom={<Typography sx={{'button': {fontSize: '18px', fontFamily:'Noto Sans TC', fontWeight: '500'}}}>
            <Button onClick={handleCancel}>{t('dialog.btn-cancel')}</Button>
            <Button onClick={handleConfirm}>{t('dialog.btn-confirm')}</Button>
          </Typography>
        }
    >

    </ModalDialog>)
}

export default ContentDialog