import r from 'ramda';
import React from 'react';
import { getValue, mapIndexed, handleEnter, getLength } from '../../helpers';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Header from '../../components/header';
import Paragraph from '../../components/paragraph';

const SoWhat = (editSoWhat, addSoWhat) => (soWhat, index, arr) => {
  const handleEditSoWhat = r.compose(
    r.partial(editSoWhat, [index]),
    getValue,
  );
  
  return (
    <div key={index}>
      <Input 
        value={soWhat} 
        placeholder="So What?"
        onChange={handleEditSoWhat}
        onKeyPress={handleEnter(addSoWhat)}
      />
      {
        soWhat && index === (getLength(arr) - 1) && <Button type="button" onClick={addSoWhat}>So What?</Button>
      }
    </div>
  );
};
  
const mapSoWhats = r.compose(
  mapIndexed,
  SoWhat,
);

export default ({ soWhats, addSoWhat, editSoWhat }) => {  
  return (
    <div>
      {
        getLength(soWhats) ?  
          <div>
            <Header>So What?</Header>
            <Paragraph>
              Why does this topic matter to the reader?
              Keep asking "So what?" until you exhaust all answers!
            </Paragraph>
          </div>
        : null
      }
      {
        mapSoWhats(editSoWhat, addSoWhat)(soWhats)
      }
    </div>
  );
};
