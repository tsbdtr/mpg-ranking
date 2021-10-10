import dbConnect from './db-connect'
import LeagueRanking from '../models/league-ranking'

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

export async function getLeagueRanking (leagueId)
{
    await dbConnect()

    let leagueRanking = await LeagueRanking.findOne({ leagueId: leagueId })
                                           .sort({ _id: -1 })
                                           .limit(1)
                                           .lean()
                                           .exec()

    // MPG ranking is updated once a week so no need to update it before except if there is no ranking yet
    const now = new Date()
    if (!leagueRanking || (leagueRanking.onDate.getDate() < now.getDate() - 7))
    {
        leagueRanking = await createLeagueRanking(leagueId)
        leagueRanking = leagueRanking.toObject()
    }

    leagueRanking.ranking.forEach(value => value._id = JSON.stringify(value._id))

    return leagueRanking.ranking
}

async function createLeagueRanking (leagueId)
{
    const leagueData = await requestLeagueData(leagueId)

    const divisionNumbers = []
    const ranking = []
    for (let i = 0; i < leagueData["divisions"].length; ++i)
    {
        divisionNumbers.push(leagueData['divisions'][i]['divisionNum'])
        const matchData = await requestMatchData(`${ leagueId }_${ leagueData['seasonNum'] }_${ leagueData['divisions'][i]['divisionNum'] }`)
        for (let j = 0; j < matchData["division"]["teams"].length; ++j)
        {
            ranking.push({
                teamId: matchData['division']['teams'][j]['id'],
                teamName: matchData['division']['teams'][j]['name'],
                point: matchData['division']['teams'][j]['points'],
                win: matchData['division']['teams'][j]['win'],
                loss: matchData['division']['teams'][j]['loss'],
                draw: matchData['division']['teams'][j]['draw'],
                goalAverage: matchData['division']['teams'][j]['realGP'] - matchData['division']['teams'][j]['realGC']
            })
        }
    }

    return await LeagueRanking.create({
        leagueId: leagueId,
        seasonNumber: leagueData['seasonNum'],
        divisionNumbers: divisionNumbers,
        ranking: ranking.sort((a, b) => parseFloat(b['point']) - parseFloat(a['point']) || parseFloat(b['goalAverage']) - parseFloat(a['goalAverage']))
    })
}

export async function getLeagueIds ()
{
    await dbConnect()

    return await LeagueRanking.find({}, 'leagueId')
                              .distinct('leagueId')
                              .lean()
                              .exec()
}
