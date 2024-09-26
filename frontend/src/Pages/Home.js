import React from 'react';
import Banner from '../Components/Banner'
import '../Styles/Grid.css'
import '../Styles/Home.css'
import Subbanner from '../Components/Subbanner';

function Home() {

  return (
    <div>
      <Banner 
        title="Trivia Night"  
      />
      <Subbanner></Subbanner>
      <div class="grid-container">
        <div class="block q"> test</div>
        <div class="block q-body"> test</div>
        <div class="block chat-history"> test</div>
        <div class="block q-answer"> test</div>
        <div class="block chat-box"> test</div>
      </div>
    </div>
  );
}

export default Home;
