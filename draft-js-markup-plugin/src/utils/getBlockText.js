const getBlockText = (editorState, selection) => {
  const anchorKey = selection.getAnchorKey();
  const currentContent = editorState.getCurrentContent();
  const currentBlock = currentContent.getBlockForKey(anchorKey);
  return currentBlock.getText();
};

export default getBlockText;
