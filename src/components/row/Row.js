import React from 'react';
import { ErrorBoundary } from '../app/errorBoundary/ErrorBoundary';

export function Row({ leftEl, rightEl }) {
	return (
		<div className="row mb2">
			<div className="col-md-6">
				<ErrorBoundary>
					{leftEl}
				</ErrorBoundary>
			</div>
			<div className="col-md-6">
				<ErrorBoundary>
					{rightEl}
				</ErrorBoundary>
			</div>
		</div>
	);
}
