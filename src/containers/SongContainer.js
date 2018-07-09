import { connect } from 'react-redux'
import Song from '../components/Song'
import { selectSong, playSong, pauseSong, removeSong } from '../actions'

const mapStateToProps = (state, ownProps) => {
    const {song, artist} = state.meta[ownProps.id]
    return {
        active: ownProps.id === state.active,
        songs: state.songs, 
        song,
        artist,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    selectCurrent: () => {
        dispatch(selectSong(ownProps.id))
        dispatch(playSong(ownProps.id))
    },
    removeCurrent: () => dispatch(removeSong(ownProps.id)),
    pauseCurrent: () => dispatch(pauseSong(ownProps.id)),
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
        selectCurrent: () => {
            stateProps.songs.forEach(id => dispatchProps.pauseSong(id))
            dispatchProps.selectCurrent()
        }
    })
)(Song)