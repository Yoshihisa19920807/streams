import React from 'react';
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions/index'

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '1017242313926-78115ibfrf8gmf6cdf9uo8p04rsrkb7r.apps.googleusercontent.com',
        scope: 'email',
        plugin_name: "streamy",
      }).then(() => {
        // const auth = window.gapi.auth2.getAuthInstance()
        // auth.signIn()
        this.auth = window.gapi.auth2.getAuthInstance();
        console.log("this.auth")
        console.log(this.auth)
        // isSignedIn内のprototypeにて定義されている。　listenも同様
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        this.onAuthChange(this.auth.isSignedIn.get());
        // listenerを設定出来る
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  onAuthChange = (isSignedIn) => {
    // this.setState({ isSignedIn: this.auth.isSignedIn.get()})
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }

  }

  onClickSignIn = () => {
    console.log("onclickSignin")
    this.auth.signIn()
  }

  onClickSignOut = () => {
    this.auth.signOut()
  }

  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return (
        <button
          className='ui red google button'
          // onClick={this.onClickSignOut()}にするとrender時にも呼ばれる
          onClick={this.onClickSignOut}
        >
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className='ui red google button'
          onClick={this.onClickSignIn}
        >
          <i className='google icon' />
          Sign In with Google
        </button>
      )
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.uesrId,
  };
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
