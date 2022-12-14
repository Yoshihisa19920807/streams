import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom'

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams()
  }

  renderAdmin(stream) {
    // console.log("renderAdmin")
    // console.log(stream.userId)
    // console.log(this.props.currentUserId)
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className='ui button negative'>Delete</Link>
        </div>
      )
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right '}}>
          <Link to="/streams/new" className='ui button primary'>
            Create Stream
          </Link>
        </div>
      )
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      console.log("stream.title")
      console.log(stream.title)
      return (
        <div className="item" key={stream.id}>
          {/* ここに入れないと改行した上で右に表示されてしまう */}
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className='content'>
            {stream.title}
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <h2>Stream List</h2>
        <div className='ui celled list'>
          {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    streams:  Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
