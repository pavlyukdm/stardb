import React from 'react';

export function Row({ leftEl, rightEl }) {
	return (
		<div className="row mb2">
			<div className="col-md-6">
				{leftEl}
			</div>
			<div className="col-md-6">
				{rightEl}
			</div>
		</div>
	);
}
