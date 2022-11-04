import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  renderError = ({ error, touched }) => {
    // console.log(error, touched)
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  // renderInput(formProps) {
  // ↓ renderInput(formProps.input) { と同じ
  renderInput = ({ input, label, meta }) => {
    // console.log(label)
    // console.log(meta)
    // console.log(formProps)
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
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
    );
  };

  onSubmit = (formValues) => {
    // console.log("formValues_create")
    // console.log(formValues)
    this.props.createStream(formValues);
    // event.preventDefault();
    // console.log("formValues")
    // console.log(formValues)
  };

  render() {
    // console.log("this.props")
    // console.log(this.props)
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const validate = (formValues) => {
  // console.log("value")
  // console.log(formValues)
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    // console.log("if (!formValues.description) {")
    errors.description = 'You must enter a description';
  }

  // console.log(errors)
  // redux refers to the name of the <Field /> and assign the corresponding error message
  return errors;
};

// export default reduxForm({
//   form: 'streamCreate',
//   // ↓ 省略　validate: validate
//   validate
// })(StreamCreate);

export default connect(null, { createStream })(StreamCreate);
