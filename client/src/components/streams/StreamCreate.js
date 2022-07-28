import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  // renderInput(formProps) {
  // ↓ renderInput(formProps.input) { と同じ
  renderInput({ input, label }) {
    console.log(input)
    return (
      <div className="field">
        <label>{label}</label>
        <input
          // onChange={input.onChange}
          // value={input.value}
          // ↓ shorthand
          {...input}
        />
      </div>
    )
  }

  onSubmit(formValues) {
    // event.preventDefault();
    console.log("formValues")
    console.log(formValues)
  }

  render() {
    console.log(this.props)
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
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

export default reduxForm({
  form: 'streamCreate',
})(StreamCreate);
