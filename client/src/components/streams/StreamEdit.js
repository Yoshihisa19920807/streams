import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
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

  onSubmit = (formValues) => {
    this.props.updateStream(formValues)
    // event.preventDefault();
    // console.log("formValues")
    // console.log(formValues)
  }

  render() {
    console.log("this.props")
    console.log(this.props)
    return <div>
      StreamEdit
    </div>
  }
}

const mapStateToProps = (state, ownprops) => {
  // console.log(state)
  // console.log(state.streams)
  // console.log(ownprops.match.params.id)
  // console.log(state.streams[ownprops.match.params.id])
  console.log()
  return {
    stream: state.streams[ownprops.match.params.id]
  }
}

export default connect(mapStateToProps, {
  fetchStream
})(StreamEdit);
