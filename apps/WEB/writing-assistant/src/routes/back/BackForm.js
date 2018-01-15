import React from 'react';
import Button from '../../components/Button';

export default ({ goBack, hasPast }) => {
  if (hasPast) {
    return (
      <form>
        <Button type="button" style={{ float: 'right', marginRight: 20 }} onClick={goBack}>Undo</Button>
      </form>
    );
  }
  
  return null;
};
