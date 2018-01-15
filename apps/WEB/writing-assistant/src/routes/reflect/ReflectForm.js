import r from 'ramda';
import React from 'react';
import { getValue } from '../../helpers';
// import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import Header from '../../components/header';
import Paragraph from '../../components/paragraph';

export default ({ reflect, setReflect, soWhats }) => {
  if (soWhats.length < 2) {
    return null;
  }
  
  return (<form>
    <Header>Reflect</Header>
    <Paragraph style={{ maxWidth: 700 }}>
      Put your main idea into words that reflect the reader's point of view.
      This should be the same meaning but reworded in a "you" format.
    </Paragraph>
    <TextArea 
      placeholder="Reflect the main idea"
      value={reflect}
      onChange={r.compose(
        setReflect,
        getValue,
      )}
    />
  </form>)
};