import Link from 'next/link'
import Layout from '../components/layout'

function HomePage ()
{
    // TODO : add mean to input MPG league id... for now it is hard coded
    return (
        <Layout home>
            <Link href="/rankings/NLE1F2FK">
                <a>Ranking for 'NLE1F2FK'</a>
            </Link>
        </Layout>
    )
}

export default HomePage