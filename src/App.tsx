import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'

import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

import Header from './components/header'
import CreateNews from './components/createNews'

const Main = styled(Box)<BoxProps>(() => ({
  minHeight: '500px',
  paddingtop: '10px',
  borderTop: '1px solid #ccc',
  color: '#000',
  clear: 'both'
}))


const App = () => {
  const { t, ready } = useTranslation()

  if(!ready)
    return null

  return (<>
    <Header />
    <Main>
      <CreateNews />
    </Main>
  </>)
}

export default App
