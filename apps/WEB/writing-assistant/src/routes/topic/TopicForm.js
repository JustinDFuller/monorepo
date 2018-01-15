import React from 'react';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import Header from '../../components/header';
import Paragraph from '../../components/paragraph';

export default ({ topic, soWhats, setTopic, addSoWhat }) => (
  <form>
    <Header>The Main Idea</Header>
    <Paragraph style={{ maxWidth: 700 }}>
      Type out the main idea that you want to convey. 
      This should be a short paragraph that focuses 
      your writing without getting too specific.
    </Paragraph>
    <TextArea 
      placeholder="What's the main idea?"
      value={topic}
      onChange={setTopic}
    />
  {
    topic && !soWhats.length && <Button type="button" onClick={addSoWhat}>So What?</Button>
  }
  </form>
);
