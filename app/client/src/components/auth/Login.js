import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		};
		
		this.props.loginUser(user);
	}
	

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history.push('/list');
		}
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/list');
		}
	}

	render() {
		return (
			<div className="container pt-5">
				<div className="row justify-content-sm-center">
					<div className="col-sm-6 col-md-4">
						<div className="card border-info text-center">
							<div className="card-header">Login</div>
							<div className="card-body">
								<img src="https://images-na.ssl-images-amazon.com/images/I/410PZM7EJ%2BL.png" width="100%" alt="dcoder" />
								<br /><br />
								<form className="form-signin" onSubmit={this.onSubmit.bind(this)}>
								<input 
										type="text" 
										name='email'
										className="form-control mb-2" 
										placeholder="Email" 
										value={this.state.email}
										onChange={this.onChange.bind(this)}
										required
										autoFocus />
									<input 
										type="password" 
										name="password"
										className="form-control mb-2" 
										placeholder="Password"
										onChange={this.onChange.bind(this)}
										value={this.state.password}
										required 
										/>
									<div className="form-inline text-center" style={{display: 'flex', 'justifyContent': 'center'}}>
										<button className="btn btn-lg btn-block btn-success m-1" type="submit">Login</button>
									</div>
									<label className="checkbox float-left"></label>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);
