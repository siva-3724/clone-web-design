import React from 'react'
import Stories from './Stories'
import Posts from './posts'

function Feed() {  // Capitalized component name (best practice)
  return (
    <div>  
      <div><Stories /></div>
      <div><Posts /></div>
    </div>
  );
}

export default Feed  ;// Capitalized component name

