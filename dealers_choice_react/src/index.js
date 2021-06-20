import React from 'react'
import ReactDOM from 'react-dom'



export default class Main extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }


  render(){
    return (
      <div id='main'>
        <p> </p>
      </div>
    )
  }



}


ReactDOM.render(
  <Main />,
  document.getElementById('app')
)