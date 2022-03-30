// page wrapper
// @author Pluto <huarse@gmail.com>
// @create 2019/02/11

import React, { Component } from 'react';
import Erroring from '@/components/blank/error';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 可以在这里添加日志
    console.warn('ErrorBoundary::something error:', error, info);
  }

  render() {
    return this.state.hasError ?
      <Erroring noborder onClick={() => location.reload()} height="80vh" /> : this.props.children;
  }
}
