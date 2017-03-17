import React from 'react'

class Input extends React.Component {
  state = { className: '' }

  onBlurFocus = (e) => {
    this.setState({
      className: e.type === 'focus' || e.currentTarget.value.length > 0 ? 'focused' : ''
    })
  }

  render() {
    const { required, name, label, defaultValue, onInputChange } = this.props

    return (
      <div className={('form-group ' + this.state.className).trim()}>
        <label>{label}</label>
        <input type="text"
          className="form-control"
          placeholder={label}
          required={required}
          name={name}
          defaultValue={defaultValue}
          onChange={onInputChange}
          onFocus={this.onBlurFocus}
          onBlur={this.onBlurFocus} />
      </div>
    )
  }
}

export default Input