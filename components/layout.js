import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'

export const siteTitle = 'MPG League Ranking'

// TODO : we use a simple favicon (generated)
export default function Layout ({ children, home })
{
    return (
        <div className={ styles.container }>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <title>League Ranking</title>
                <meta name="description" content="League ranking for MPG player"/>
                <meta name="og:title" content={ siteTitle }/>
                <meta name="" content=""/>
            </Head>
            <header className={ styles.header }>
                <h1>MPG League Ranking</h1>
            </header>
            <main className={ styles.content }>{ children }</main>
            {
                !home && (
                    <div className={ styles.backToHome }>
                        <Link href="/">
                            <a>← Back to home</a>
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