import { useRouter } from 'next/router'
import { fr } from './fr'
import { en } from './en'

export const getLocale = () => {
    return (useRouter().locale === 'en' ? en : fr)
}
