import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { DateTime } from 'luxon';

i18n.
    use(Backend).
    use(LanguageDetector).
    use(initReactI18next).
    init({
        debug: true,
        fallbackLng: 'en',
        returnEmptyString: false

    })


i18n.services.formatter.add('DATA_LONG', (value, lng, _options) => {
    return DateTime.fromJSDate(value).setLocale(lng).toLocaleString(DateTime.DATETIME_HUGE)
})

export default i18n