import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export class Loading extends React.Component {
  render() {
    return (
      <div>
      <Segment>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>

        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      </Segment>
      </div>
    )
  }
}

export default Loading