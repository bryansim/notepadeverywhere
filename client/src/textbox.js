import React from "react";
import { withRouter  } from "react-router-dom";

class Textbox extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          userText: '', //this.onLoad(this.props.match.params.id), how do we get this to pull from the json? maybe a function?
          userId: this.props.match.params.id //pulls ID from URL
        }
      }

    componentDidMount() {
      this.onLoad(this.state.userId);
    }

    onLoad(id) {
        //use id to get initial text via API
        let hostName = window.location.hostname;

        fetch(`http://${hostName}/api/${id}`)
        .then(response => response.text())
        .then(data => {
          this.setState({ userText: data })
        });

    }

    handleChange(event) {
        let newText = event.target.value;
        let hostName = window.location.hostname;

        if ( newText.length > 10000) {
          newText = newText.substring(0,10000);
        }

        this.setState({ userText: newText });

        newText = { "text" : newText };

        // patch to node server
        fetch(`http://${hostName}/api?id=${this.state.userId}`, {
          method: 'PUT',
          body: JSON.stringify(newText),
          headers: {
              'Content-Type': 'application/json'
          }
        }).then(res => {
            return res;
        }).catch(err => err);
    }

    render() {
        return <textarea type="text" name="userText" value={this.state.userText} 
          onChange={this.handleChange.bind(this)}/>
    }

}

export default withRouter(Textbox);