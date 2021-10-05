import Head from 'next/head'
import Layout from '../../components/layout'
import { getLeagueIds, getRanking } from '../../lib/mpg'
import { DataGrid } from '@mui/x-data-grid'

export async function getStaticProps ({ params })
{
    const leagueId = params.league_id
    const rankingData = await getRanking(leagueId)

    return {
        props: {
            leagueId,
            rankingData
        }
    }
}

export async function getStaticPaths ()
{
    const paths = getLeagueIds()
    return {
        paths,
        fallback: false
    }
}

export default function LeagueRanking ({ leagueId, rankingData })
{
    // TODO: parse rankingData to extract column : is that possible ?
    const columns = [
        {
            field: 'rank',
            headerName: 'Rank',
            flex: 0.4,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'team',
            headerName: 'Team',
            flex: 1.2,
            resizable: true,
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'points',
            headerName: 'Point',
            flex: 0.7,
            editable: false,
            resizable: true,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'win',
            headerName: 'Win',
            flex: 0.4,
            editable: false,
            resizable: true,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'loss',
            headerName: 'Loss',
            flex: 0.4,
            editable: false,
            resizable: true,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'draw',
            headerName: 'Draw',
            flex: 0.4,
            editable: false,
            resizable: true,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'goalAverage',
            headerName: 'Goal average',
            flex: 0.6,
            resizable: true,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        }
    ]

    rankingData.forEach((val, idx) => val['rank'] = idx + 1)

    return (
        <Layout>
            <Head>
                <title>League ranking - { leagueId }</title>
            </Head>
            <div style={ { height: 1000, width: '100%' } }>
                <DataGrid
                    rows={ rankingData }
                    columns={ columns }
                    pageSize={ rankingData.length }
                    // rowsPerPageOptions={}
                    // checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </Layout>
    )
}