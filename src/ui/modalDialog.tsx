import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'


interface IDialog {
  open: boolean;
  titleIcon?: React.ReactNode; 
  title: string;
  children?: React.ReactNode;
  sx?: {};
  contentStyles?: {};
  widthSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  enableSlidTransition?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  dialogActionDom?: React.ReactNode;
  error?: string;
  className?: string;
}

interface DialogTitleProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

const CustomDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props
  
  return (<DialogTitle
    sx={{ m: 0, p: 2, 
      display: 'flex',
      alignItems: 'center'
    }} {...other}
  >
    {children}
    {onClose ? (
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      ><CloseIcon /></IconButton>
    ) : null}
  </DialogTitle>)
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
})

const ModalDialog = (props: IDialog)=> {
  const { title, titleIcon, children, onClose, open, contentStyles,
    sx, enableSlidTransition, widthSize, dialogActionDom, error, className } = props
  const { t } = useTranslation()

  return (<Dialog
    className={className}
    open={open}
    onClose={onClose}
    fullWidth={true}
    sx={sx}
    maxWidth={widthSize ? widthSize : 'sm'}
    TransitionComponent={enableSlidTransition ? Transition : undefined}
  >
    <CustomDialogTitle onClose={onClose}>
      {/* {titleIcon ? titleIcon 
        : <FontAwesomeIcon color={'#5F8EDC'} icon={faBullhorn} />
      } */}
      {titleIcon && titleIcon}
      <div style={{display: 'inline-block', fontWeight: 'bold', marginLeft: '10px'}}>{title}</div>
    </CustomDialogTitle>
    <DialogContent dividers sx={contentStyles}>
      {typeof children === 'string'
        ? <Typography component={'div'} sx={{fontSize: '18px'}}>{children}</Typography>
        : children
      }
      { error && <Alert severity="error">{error}</Alert> }
    </DialogContent>
    <DialogActions sx={{padding: '0px'}}>    
      { dialogActionDom 
        ? dialogActionDom
        : (<Button
            sx={{fontSize: '18px', color: '#333'}}
            onClick={onClose}>{t('dialog.btn-close')}
          </Button>)
      }
    </DialogActions>
  </Dialog>)
}

export default ModalDialog