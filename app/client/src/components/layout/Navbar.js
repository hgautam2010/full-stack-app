import React, { Component } from 'react';
import { Link, withRouter }from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Aux from "../HOC/Aux";

class Navbar extends Component {

	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
		this.props.history.push('/login');
	}

  render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<Aux>
					<h4 className="btn btn-info my-sm-0 m-2">{user.email}</h4>
					<button href="/" onClick={this.onLogoutClick.bind(this)} className="btn btn-danger my-sm-0">Sign out</button>
			</Aux>
		);

		const guestLinks = (
		 <Aux>
			  <Link className="btn btn-success my-sm-0 m-2" to='/login'>Login</Link>
				<Link className="btn btn-danger my-sm-0" to='/register'>Register</Link>
		 </Aux>
		);


	return (
	  <div>
			<nav className="navbar navbar-dark bg-dark justify-content-between">
				<Link className="navbar-brand text-light" to='/login'>Dcoder</Link>
				<form className="form-inline">
					{isAuthenticated ? authLinks : guestLinks}
				</form>
			</nav>
	  </div>
	)
  }
}
const mapStsteToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStsteToProps,{ logoutUser })(withRouter(Navbar));
