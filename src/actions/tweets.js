
import { saveLikeToggle } from '../utils/api'

export const RECIEVE_TWEETS = 'RECIEVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

export function recieveTweets(tweets) {
    return {
        type: RECIEVE_TWEETS,
        tweets,
    }
}

export function toggleTweet( {id, authedUser, hasLiked} ) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToggleTweet (info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))

        return saveLikeToggle(info)
        .catch((e) => {
            console.warn('Error in handleToggleTweet: ', e)
            dispatch(toggleTweet(info))
            alert('There was an error liking the tweet. Try again.')
        })
    }
}