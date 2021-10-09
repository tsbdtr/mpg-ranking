// TODO : add database and store some data instead of making API request call everytime ?
// TODO : add parameter to configure refresh time (once a week depending on the MPG league)

export async function requestLeagueData (leagueId)
{
    const url = `https://api.mlnstats.com/mpgleague/league/${ leagueId }`
    const res = await fetch(url)
    return await res.json()
}

export async function requestMatchData (matchId)
{
    const url = `https://api.mlnstats.com/mpgleague/matches/${ matchId }`
    const res = await fetch(url)
    return await res.json()
}

export async function getRanking (leagueId)
{
    const leagueData = await requestLeagueData(leagueId)

    const rankingData = []
    for (let i = 0; i < leagueData["divisions"].length; ++i)
    {
        const matchData = await requestMatchData(`${ leagueId }_${ leagueData['seasonNum'] }_${ leagueData['divisions'][i]['divisionNum'] }`)
        for (let j = 0; j < matchData["division"]["teams"].length; ++j)
        {
            rankingData.push({
                id: matchData['division']['teams'][j]['id'],
                team: matchData['division']['teams'][j]['name'],
                points: matchData['division']['teams'][j]['points'],
                win: matchData['division']['teams'][j]['win'],
                loss: matchData['division']['teams'][j]['loss'],
                draw: matchData['division']['teams'][j]['draw'],
                goalAverage: matchData['division']['teams'][j]['realGP'] - matchData['division']['teams'][j]['realGC']
            })
        }
    }

    return rankingData.sort((a, b) => parseFloat(b['points']) - parseFloat(a['points'])
        || parseFloat(b['goalAverage']) - parseFloat(a['goalAverage']))
}

export function getLeagueIds(locales)
{
    // TODO: for now there is only one league and it is hard coded... (for allowed ranking page)
    const leagueId = 'NLE1F2FK'

    return [
        {
            params: {
                league_id: leagueId,
            },
            locale: 'fr'
        },
        {
            params: {
                league_id: leagueId,
            },
            locale: 'en'
        }
    ]
}
