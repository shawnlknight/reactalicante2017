import React from 'react'
import { reduxForm, Field } from 'redux-form'
import showResults from './showResults'
import isValidEmail from 'sane-email-validation'
import states from '../data/states'

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid Email'
  }
  if (!values.state) {
    errors.state = 'Required'
  }
  if (!values.zip) {
    errors.zip = 'Required'
  }
  if (!values.age) {
    errors.age = 'Required'
  }

  return errors
}

const createRenderer = render => ({ input, meta, label, ...rest }) => {
  console.log('input', input)

  return (
    <div
      className={[
        meta.error && meta.touched ? 'error' : '',
        meta.active ? 'active' : ''
      ].join(' ')}
    >
      <label htmlFor={input.name}>
        {label}
      </label>
      {render(input, label, rest)}
      {meta.error &&
        meta.touched &&
        <span>
          {meta.error}
        </span>}
    </div>
  )
}

const RenderInput = createRenderer((input, label, type) => {
  const inputType = type.type
  return (
    <input {...input} type={inputType} placeholder={label} id={input.name} />
  )
})

const RenderSelect = createRenderer((input, label, { children }) =>
  <select {...input}>
    {children}
  </select>
)

let DemoForm = ({ handleSubmit, submitting }) =>
  <form onSubmit={handleSubmit(showResults)}>
    <Field
      name="firstName"
      label="First Name"
      type="text"
      component={RenderInput}
    />
    <Field
      name="lastName"
      label="Last Name"
      type="text"
      component={RenderInput}
    />
    <Field name="email" label="Email" type="text" component={RenderInput} />
    <Field name="state" label="State" type="text" component={RenderSelect}>
      <option />
      {states.map(state =>
        <option key={state} value={state}>
          {state}
        </option>
      )}
    </Field>
    <Field name="zip" label="Zip" type="text" component={RenderInput} />
    <Field name="age" label="Age" type="number" component={RenderInput} />
    <button type="submit" disabled={submitting}>
      Submit
    </button>
  </form>

DemoForm = reduxForm({
  form: 'demo',
  destroyOnUnmount: false,
  validate
})(DemoForm)

export default DemoForm
