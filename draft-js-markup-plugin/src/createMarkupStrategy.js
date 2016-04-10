/* @flow */

import findWithRegex from 'find-with-regex';

export default (regex: Function) => {
   return (contentBlock: Object, callback: Function) => {
     findWithRegex(regex, contentBlock, callback);
   };
};
