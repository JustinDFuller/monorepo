import r from 'ramda';
import React from 'react';
import { getValue, getLength } from '../../helpers';
import TextArea from '../../components/TextArea';
import Header from '../../components/header';
import Paragraph from '../../components/paragraph';

export default ({ reflect, setFormat, format }) => {
  if (getLength(reflect) < 2) {
    return null;
  }
  
  return (<form>
    <Header>Format</Header>
    <Paragraph style={{ maxWidth: 700 }}>
      Think over the type of format you want to use.
      Is it a how-to guide? A narrative? A listicle?
    </Paragraph>
    <TextArea 
      placeholder="Describe The Format"
      value={format}
      onChange={r.compose(
        setFormat,
        getValue,
      )}
    />
  </form>)
};