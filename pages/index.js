import Link from 'next/link'
import Layout from '../components/layout'
import { getLocale } from '../locales/i18n-helper'

function HomePage ()
{
    // TODO : add mean to input MPG league id... for now it is hard coded
    return (
        <Layout home>
            <Link href="/rankings/NLE1F2FK">
                <a>{ getLocale().goToRanking } 'NLE1F2FK'</a>
            </Link>
        </Layout>
    )
}

export default HomePage