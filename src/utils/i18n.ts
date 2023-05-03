import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        react: {
            useSuspense: false
        },
        backend: {
            loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
        },
        fallbackLng: 'zh',
        lng: 'zh',
        interpolation: {
            escapeValue: false
        },
        saveMissing: true,
        parseMissingKeyHandler: (key: string) => ''
    })

export default i18n