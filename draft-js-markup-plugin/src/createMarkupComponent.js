import React, { Component } from 'react';

export default (style: string) => {
   return class MentionSearch extends Component {
      render() {
         return (
            <strong> style = { this.props.children } </strong>
         );
      };
   };
};
