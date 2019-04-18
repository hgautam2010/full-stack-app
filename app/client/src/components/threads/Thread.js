import React from 'react';

function Thread(props) {
	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return (
	<div className="card m-3">
		<div className="card-header bg-dark text-light">
			{props.title}
		</div>
		<ul className="list-group list-group-flush">
			<li className="list-group-item">{props.description}</li>
		</ul>
		<div className="container col-12 m-2">
			<div className="row">
				<div className="col-xs-6 col-sm-6 col-md-6">
					{props.tags.map((tag,i) =>
						<span key={i} className="badge badge-info m-1">{tag}</span>
					)}
				</div>
				<div className="col-xs-6 col-sm-6 col-md-6 text-right mr-0 text-center">
					<span className="badge badge-secondary mr-3">{props.user}</span>
					<span className="badge badge-light">{new Date(props.date).toLocaleDateString('en-US', options)}</span>
				</div>
			</div>
		</div>
	</div>
  )
}

export default  Thread;