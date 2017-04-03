import React from 'react'
import './input.css'

class Input extends React.Component {
  state = { className: '' }

  onBlurFocus = (e) => {
    this.setState({
      className: ('form-group ' + (e.type === 'focus' || e.currentTarget.value.length > 0 ? 'focused' : '')).trim()
    })
  }

  componentDidMount() {
    this.setState({
      className: ('form-group ' + (this.props.defaultValue || this.props.value ? 'focused' : '')).trim()
    })
  }

  render() {
    const { type = 'text', onInputChange, label, required = true, ...props } = this.props

    return (
      <div className={this.state.className}>
        <label className="control-label">{label}</label>
        <input
          className="form-control"
          required={required}
          type={type}
          placeholder={label}
          onChange={onInputChange}
          onFocus={this.onBlurFocus}
          onBlur={this.onBlurFocus}
          {...props} />
      </div>
    )
  }
}

export default Input
