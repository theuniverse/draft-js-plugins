/* @flow */

import findWithRegex from 'find-with-regex';

const MENTION_REGEX = /(\s|^)\@[\w]*/g;

export default (regex: Function) => {
   return (contentBlock: Object, callback: Function) => {
     findWithRegex(regex, contentBlock, callback);
   };
};
