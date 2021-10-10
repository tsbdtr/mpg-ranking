import mongoose from 'mongoose'
const { Schema } = mongoose

const leagueRankingSchema = new Schema({
    leagueId: {
        type: String,
        trim: true,
        required: [true, 'league id is required']
    },
    seasonNumber: {
        type: Number,
        required: [true, 'season number is required']
    },
    divisionNumbers: {
        type: Array,
        required: [true, 'divisions numbers are required']
    },
    onDate: {
        type: Date,
        default: Date.now
    },
    ranking: [{
        teamId: {
          type: Number,
          required: [true, 'team id is required']
        },
        teamName: {
            type: String,
            trim: true,
            required: [true, 'team name is required']
        },
        point: {
            type: Number,
            required: [true, 'number of point is required']
        },
        win: {
            type: Number,
            required: [true, 'number of win is required']
        },
        loss: {
            type: Number,
            required: [true, 'number of loss is required']
        },
        draw: {
            type: Number,
            required: [true, 'number of draw is required']
        },
        goalAverage: {
            type: Number,
            required: [true, 'goal average is required']
        }
    }]
})

export default mongoose.models.LeagueRanking || mongoose.model('LeagueRanking', leagueRankingSchema)
