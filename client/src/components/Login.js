import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Spinner from './Spinner'
import { setAllMeta, setSongList } from '../actions'

const LoginButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    a {
        display: flex;
        align-items: center;
        background-color: ${({ theme }) => theme.secondary.light};
        padding: 0.2em;
        border-radius: 0.8em;
        border: 0.2em solid ${({ theme }) => theme.secondary.dark};
        color: ${({ theme }) => theme.primary.light};
        font-size: 2em;
        text-decoration: none;
        font-weight: bold;
        transition: font-size 0.1s ease-in, color 0.1s ease-in;

        :hover {
            font-size: 2.2em;
            color: black;
            cursor: grab;
        }
    }
`

class Login extends Component {
    constructor(props) {
        super(props)
        // let loggedIn = localStorage.getItem('loggedIn') || false
        // if (loggedIn) {
        //     const { expires } = JSON.parse(loggedIn)
        //     if (Date.now() >= expires) {
        //         loggedIn = false
        //     }
        // }
        this.state = {
            // fetching: loggedIn,
            fetching: true,
            code: null,
            // loggedIn,
            loggedIn: false,
        }
    }

    componentDidMount() {
        const { fetching } = this.state
        const { setSongList, setAllMeta } = this.props

        if (fetching) {
            // fake spinner for 1 second
            setTimeout(async () => {
                let room, songs, meta
                try {
                    room = await axios.get('/api/room')
                    songs = await axios.get('/api/songs')
                    meta = await axios.get('/api/meta')
                } catch (e) {
                    console.error(e)
                    this.setState({ fetching: false })
                    return
                }
                setAllMeta(meta.data.meta)
                setSongList(songs.data.songs)
                this.setState({
                    fetching: false,
                    code: room.data.room,
                })
            }, 1000)
        }
    }

    render() {
        const { fetching, code, loggedIn } = this.state

        return (
            <LoginButton>
                {fetching ? (
                    <Spinner round />
                ) : loggedIn ? (
                    <Redirect to={`/room/${code}`} />
                ) : (
                    <LoginAnimation
                        initialPose="hidden"
                        pose="visible"
                        href="http://localhost:3001/api/login"
                    >
                        Login with Spotify
                    </LoginAnimation>
                )}
            </LoginButton>
        )
    }
}

export default connect(
    null,
    dispatch => ({
        setSongList: songs => dispatch(setSongList(songs)),
        setAllMeta: meta => dispatch(setAllMeta(meta)),
    }),
)(Login)
