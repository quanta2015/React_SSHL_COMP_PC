import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Switch } from 'antd';
import classNames from 'classnames';

export default function switchHOC(Element) {
  class ElementWithSwitch extends Component {
    state = {
      switchOn: false,
    }

    static getDerivedStateFromProps(props, state) {
      // 仅在 props.value 更改后重置 state.switchOn
      if (props.value !== state.prevPropsValue) {
        return {
          prevPropsValue: props.value,
          switchOn: props.value !== props.valueOff,
        };
      }
      return null;
    }


    handleSwitchChange = (checked) => {
      const { valueOff } = this.props;
      this.setState({
        switchOn: checked,
      });
      if (!checked) {
        this.props.onChange(valueOff);
      }
    }

    handleInnerChange = (nextValue) => {
      this.props.onChange(nextValue);
    }

    renderInner() {
      const { props, value, valueOff } = this.props;
      if (!this.state.switchOn) return null;
      const elementProps = {
        ...props,
        className: classNames('cf-switch-inner', props.className),
      };
      // 如果刚刚打开 switch，则无需将 value 赋值到内部组件上
      if (value !== valueOff) {
        elementProps.value = value;
      }
      return (
        <Element
          {...elementProps}
          onChange={this.handleInnerChange}
        />
      );
    }

    render() {
      const { className, props, value, onChange, valueOff, ...others } = this.props;
      return (
        <div className={classNames('cf-switch', className)}>
          <Switch
            className="fusion-switch"
            {...others}
            checked={this.state.switchOn}
            onChange={this.handleSwitchChange}
          />
          {
            this.renderInner()
          }
        </div>
      );
    }
  }
  ElementWithSwitch.displayName = 'ElementWithSwitch';
  // ElementWithSwitch.propTypes = {
  //   // switch 的 className
  //   className: PropTypes.string,
  //   // 组件值，关闭后为 props.valueOff，开启后为内部组件的值
  //   value: PropTypes.any,
  //   // 值改变后的回调函数，触发时机：switch 开 & 关，
  //   onChange: PropTypes.func,
  //   // 关闭时的值
  //   valueOff: PropTypes.any,
  //   // 内部组件的 props
  //   props: PropTypes.objectOf(PropTypes.any),
  // };
  ElementWithSwitch.defaultProps = {
    className: '',
    value: null,
    onChange() { },
    valueOff: null,
    props: {},
  };

  return ElementWithSwitch;
}
