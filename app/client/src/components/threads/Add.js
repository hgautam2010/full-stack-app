import React, { Component } from 'react';
import { addThread } from '../../actions/threadActions';
import { connect } from "react-redux";

class Add extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			tags: ''
		};
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const thread = {
			title: this.state.title,
			description: this.state.description,
			tags: this.state.tags
		};
		
		this.props.addThread(thread);
		this.props.history.push('/list');
	}

  render() {
	return (
	<div className="container pt-5 col-md-8">
		<br /><br />
		<div className="m-auto col-sm-8 col-md-6">
			<div className="card border-info text-center">
				<div className="card-header">Add New Thread</div>
				<div className="card-body">
					<form className="form-signin" onSubmit={this.onSubmit.bind(this)}>
						<input type="text" onChange={this.onChange.bind(this)} name="title" className="form-control mb-2" placeholder="Title" required autoFocus />
						<input type="text" onChange={this.onChange.bind(this)} name="description" className="form-control mb-2" placeholder="Description.." required />
						<small id="emailHelp" className="form-text text-muted text-left">Input tags as comma saperated</small>
						<input id="tag" onChange={this.onChange.bind(this)} type="text" name="tags" className="form-control mb-2" placeholder="Tags.." />
						<div className="form-inline text-center" style={{'display': 'flex', 'justifyContent': 'center'}}>
							<button className="btn btn-lg btn-block btn-success m-1" type="submit">Create</button>
						</div>
						<label className="checkbox float-left" />
					</form>
				</div>
			</div>
		</div>
	</div>
	)
  }
}

export default connect(null, { addThread })(Add);