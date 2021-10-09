import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import { getLocale } from '../locales/i18n-helper'

// TODO : we use a simple favicon (generated)
export default function Layout ({ children, home })
{
    return (
        <div className={ styles.container }>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <title>League Ranking</title>
                <meta name="description" content={ getLocale().description }/>
                <meta name="og:title" content={ getLocale().siteTitle }/>
            </Head>
            <header className={ styles.header }>
                <h1>{ getLocale().mainTitle }</h1>
            </header>
            <main className={ styles.content }>{ children }</main>
            {
                !home && (
                    <div className={ styles.backToHome }>
                        <Link href="/">
                            <a>{ getLocale().backToHome }</a>
                        </Link>
                    </div>
                )
            }
            <footer className={ styles.footer }>
                @ Copyright 2021
            </footer>
        </div>
    )
}