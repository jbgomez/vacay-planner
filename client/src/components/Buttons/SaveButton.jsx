import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

class SaveButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.toggleFavorite();
  }

  render() {
    return (
      <div style={{position: 'absolute', bottom: '0.33em', right: 0}}>
        <Icon style={this.props.isSaved ? {color: 'red'} : {color: 'grey'}}
            name={this.props.isSaved ? 'heart' : 'empty heart'}
            size='big' 
            onClick={this.onClick}
          />
      </div>
    );
  }
}

export default SaveButton;