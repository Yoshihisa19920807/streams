import React from 'react';
import _ from 'lodash'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchStream, updateStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = (formValues) => {
    console.log("formValues")
    console.log(formValues)
    this.props.updateStream(formValues)
  }

  renderError = ({ error, touched }) => {
    // console.log(error, touched)
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className='header'>
            {error}
          </div>
        </div>
      )

    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          {...input}
        />
        {this.renderError(meta)}
      </div>
    )
  }

  // onSubmit = (formValues) => {
  //   this.props.updateStream(formValues)
  //   // event.preventDefault();
  //   // console.log("formValues")
  //   // console.log(formValues)
  // }

  render() {
    console.log("this.props")
    console.log(this.props)
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownprops) => {
  // console.log(state)
  // console.log(state.streams)
  // console.log(ownprops.match.params.id)
  // console.log(state.streams[ownprops.match.params.id])
  return {
    stream: state.streams[ownprops.match.params.id]
  }
}

export default connect(
  mapStateToProps,{
    fetchStream,
    updateStream
  }
)(StreamEdit);
