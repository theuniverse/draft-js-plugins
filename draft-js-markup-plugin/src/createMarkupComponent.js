import React, { Component } from 'react';

export default (style: string, syntax: Function) => {
  return class MarkupComponnt extends Component {
    componentWillMount() {
      this.props.callbacks.onChange = this.props.callbacks.onChange.set(this.key, this.onEditorStateChange);
    };

    componentWillUnmount() {
      this.props.callbacks.onChange = this.props.callbacks.onChange.delete(this.key);
    };

    onEditorStateChange() {

    };

    render() {
      return (
        <span> { this.props.children } </span>
      );
    };
  };
};
