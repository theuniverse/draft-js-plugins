import React, { Component } from 'react';

export default (style: string) => {
   return class MarkupComponnt extends Component {
      render() {
         return (
            <strong> { this.props.children } </strong>
         );
      };
   };
};
