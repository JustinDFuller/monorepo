import React from 'react';
import Button from '../../components/Button';

export default ({ reset }) => (
  <form>
    <Button style={{ float: 'right' }} type="button" onClick={reset}>Reset</Button>
  </form>
);
