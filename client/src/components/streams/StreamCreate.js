import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions'

class StreamCreate extends React.Component {
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
  // renderInput(formProps) {
  // ↓ renderInput(formProps.input) { と同じ
  renderInput = ({ input, label, meta }) => {
    // console.log(label)
    // console.log(meta)
    // console.log(formProps)
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          // onChange={input.onChange}
          // value={input.value}
          // ↓ shorthand
          {...input}
        />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.createStream(formValues)
    // event.preventDefault();
    // console.log("formValues")
    // console.log(formValues)
  }

  render() {
    // console.log("this.props")
    // console.log(this.props)
    return (
      // errorクラスがないと中のerrorクラスがデフォルトでdisplay:noneになってしまう
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        {/* <Field /> is connected to formReducer */}
        <Field
          name='title'
          component={this.renderInput}
          label='Title'
        />
        <Field
          name='description'
          component={this.renderInput}
          label='Description'
        />
        <button className='ui button primary'>Submit</button>
      </form>
    )
  }
}

const validate = (formValues) => {
  // console.log("value")
  // console.log(formValues)
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title'
  }

  if (!formValues.description) {
    // console.log("if (!formValues.description) {")
    errors.description = 'You must enter a description'
  }

  // console.log(errors)
  // redux refers to the name of the <Field /> and assign the corresponding error message
  return errors;
}

// export default reduxForm({
//   form: 'streamCreate',
//   // ↓ 省略　validate: validate
//   validate
// })(StreamCreate);


const formWrapped = reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped)
