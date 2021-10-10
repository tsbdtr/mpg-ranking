import Head from 'next/head'
import Layout from '../../components/layout'
import { getLeagueIds, getLeagueRanking } from '../../lib/mpg'
import { DataGrid } from '@mui/x-data-grid'
import { getLocale } from '/locales/i18n-helper'

export async function getStaticProps ({ params })
{
    const leagueId = params.leagueId
    const rankingData = await getLeagueRanking(leagueId)

    // an id field is required for DataGrid so we just use the same value as _id
    rankingData.forEach(val => val.id = val._id)

    return {
        props: {
            leagueId,
            rankingData,
        },
        revalidate: 20
    }
}

export async function getStaticPaths ({ locales })
{
    const leagueIds = await getLeagueIds()

    let paths = []
    leagueIds.forEach(id => {
        locales.forEach(loc => {
            paths.push({
                params: {
                    leagueId: id
                },
                locale: loc,
            })
        })
    })

    return {
        paths: paths,
        fallback: 'blocking',
    }
}

export default function LeagueRanking ({ leagueId, rankingData })
{
    const columns = [
        {
            field: 'rank',
            headerName: getLocale().rankingRank,
            flex: 0.4,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'teamName',
            headerName: getLocale().rankingTeam,
            flex: 1.2,
            resizable: true,
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'point',
            headerName: getLocale().rankingPoint,
            flex: 0.7,
            editable: false,
            resizable: true,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'win',
            headerName: getLocale().rankingWin,
            flex: 0.4,
            editable: false,
            resizable: true,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'loss',
            headerName: getLocale().rankingLoss,
            flex: 0.4,
            editable: false,
            resizable: true,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'draw',
            headerName: getLocale().rankingDraw,
            flex: 0.4,
            editable: false,
            resizable: true,
            type: 'number',
            headerAlign: 'center',
            align: 'left'
        },
        {
            field: 'goalAverage',
            headerName: getLocale().rankingGoalAverage,
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
                <title>{ getLocale().rankingLeagueTitle } - { leagueId }</title>
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