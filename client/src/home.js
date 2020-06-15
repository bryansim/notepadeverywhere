import React from "react";
import { withRouter  } from "react-router-dom";

class Home extends React.Component{

    render() {
        return <textarea type="text" name="userText" value={"Use http://kopi.click/<your-url> to save text you need to access elsewhere. \nBe careful, it's a free-for-all!"}/>
    }

}

export default withRouter(Home);