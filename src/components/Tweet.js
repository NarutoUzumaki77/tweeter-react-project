import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline } from 'react-icons/ti'
import { TiHeartOutline } from 'react-icons/ti'
import { TiHeartFullOutline } from 'react-icons/ti'

class Tweet extends Component {

    toParent = (e, id) => {
        e.preventDefault()
        // Todo: Redirect to parent tweet.
    }

    render() {
        const { tweet } = this.props

        if (tweet === null) {
            return <p>This Tweet doesn't exist</p>
        }

        const {
            name, avater, timestamp, text, hasLiked, likes, replies, id, parent
        } = tweet

        return (
            <div className='tweet'>
                <img
                    src={avater}
                    alt={`Avater of ${name}`}
                    className='avater'
                />
                <div className='tweet-info'>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent && (
                        <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                            Replying to @{parent.author}
                        </button>
                    )}
                    <p>{text}</p>
                </div>


            </div>
        )
    }
}

function mapStateToProps ( {authedUser, users, tweets}, { id } ) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet
            ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
            : null
    }
}

export default connect(mapStateToProps)(Tweet)