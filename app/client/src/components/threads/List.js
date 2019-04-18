import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter }from "react-router-dom";
import { queryThread } from '../../actions/threadActions';
import Thread from './Thread';

class List extends Component {
	constructor() {
    super();
    this.state = {
			list: [],
			search: ''
    };
  }

  componentWillMount() {
		this.props.queryThread('');
		this.setState({list: this.props.list.list});
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.list.list) {
			this.setState({list: nextProps.list.list});
		}
	}
	
	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onClick(e) {
		e.preventDefault();
		this.props.queryThread(this.state.search);
	}

	onKeyUp(e) {
		e.preventDefault();
		this.props.queryThread(this.state.search);
	}

  render() {
	return (
		<div className="container pt-5 col-md-8">
		<div className="row">
			<div className="col-6">
				<h2 className="m-2">Threads</h2>
			</div>
			<div className="text-right col-6">
				<div className="input-group m-2">
					<input name="search" onKeyUp={this.onKeyUp.bind(this)} onChange={this.onChange.bind(this)} type="text" className="form-control" placeholder="Search Threads" aria-label="Search Threads" aria-describedby="button-addon2" />
					<div className="input-group-append">
						<button className="btn btn-dark" type="button" id="button-addon2" onClick={this.onClick.bind(this)}>Search</button>
					</div>
				</div>
			</div>
		</div>
		<div className="card-rows">
		{this.state.list.map((thread,i) => 
			<Thread key={i} title={thread.title} description={thread.description} tags={thread.tags} date={thread.date} user={thread.user}></Thread>
			)}
		</div>
		<Link to="/add" className="text-dark btn-dark-outline m-auto float-right" style={{'backgroundColor':'transparent', border: 'none'}}><i className="material-icons" style={{'fontSize': '50px'}}>add_circle_outline</i></Link>
	</div>
	)
  }
}

const mapStateToProps = (state) => ({
	list: state.list
});

export default connect(mapStateToProps, { queryThread })(withRouter(List));