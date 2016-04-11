/* @flow */

import findWithRegex from 'find-with-regex';

export default (openSyntax: Function) => {
   return (contentBlock: Object, callback: Function) => {
     findWithRegex(openSyntax, contentBlock, callback);
   };
};
