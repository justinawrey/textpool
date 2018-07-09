import { connect } from 'react-redux'
import Song from '../components/Song'
import { selectSong, playSong, pauseSong } from '../actions'

const mapStateToProps = (state, ownProps) => {
    const {song, artist, playing} = state.meta[ownProps.id]
    return {
        active: ownProps.id === state.active,
        inactive: state.songs.filter(song => song.id !== state.active),
        song,
        artist,
        playing
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    selectSong: () => dispatch(selectSong(ownProps.id)),
    playSong: () => dispatch(playSong(ownProps.id)),
    pauseSong: id => dispatch(pauseSong(id))
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    // merge props
    (stateProps, dispatchProps, ownProps) => ({
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        togglePlayback: () => {
            stateProps.inactive.forEach(id => dispatchProps.pauseSong(id))
            dispatchProps.playSong()
        }
    })
)(Song)