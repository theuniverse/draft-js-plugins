/* @flow */

import findWithRegex from 'find-with-regex';

export default (syntax: Function) => {
   return (contentBlock: Object, callback: Function) => {
     findWithRegex(syntax, contentBlock, callback);
   };
};
