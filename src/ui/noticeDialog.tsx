import React from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import WarningIcon from '@mui/icons-material/Warning'

import ModalDialog from './modalDialog'

interface INototiceProps {
    noticeMessage: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const NoticeDialog = (props:INototiceProps) => {
    const { t } = useTranslation()
    const { noticeMessage, onCancel, onConfirm } = props

    const handleCancel = () => {
      onCancel && onCancel()
    }

    const handleConfirm = () => {
      onConfirm && onConfirm()
    }

    return (<ModalDialog
      titleIcon={<WarningIcon />}
      sx={{
        'h2': {
          padding: '10px 16px 5px',
          color: '#5798D8',
          'svg': {
            color: '#FFCB00'
          }
        },
        'label': {
          color: '#555'
        },
        'textarea': {
          borderColor: '#aaa'
        }
      }}
      title={t('dialog.title-notice')}
      open={true}
      dialogActionDom={<Typography sx={{'button': {fontSize: '18px', fontFamily:'Noto Sans TC', fontWeight: '500'}}}>
        <Button sx={{color: '#333'}} onClick={handleCancel}>{t('dialog.btn-cancel')}</Button>
        <Button onClick={handleConfirm}>{t('dialog.btn-confirm')}</Button>
      </Typography>
    }
  >
    <Typography>{noticeMessage}</Typography>
  </ModalDialog>)
}

export default NoticeDialog