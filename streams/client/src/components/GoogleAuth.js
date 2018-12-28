import React from 'react';

class GoogleAuth extends React.Component {
    state = { isSignedIn: null};

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '114776258693-5r58pou3d67l8fash42f0pule8slfj9l.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange();
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
      this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton(){
        if (this.state.isSignedIn === null){
            return null;
        } else if (this.state.isSignedIn){
            return (
              <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                Sign Out
            </button>
            );
        } else {
            return (
              <button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon" />
                Sign In with Google
            </button>

            );
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>;
    }
}

export default GoogleAuth;