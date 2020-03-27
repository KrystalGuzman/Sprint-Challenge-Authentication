import React from 'react';

const Errors = ({ errorMessages, setErrorMessages }) => {
	return <div>{errorMessages.map((error, id) => <div key={id}>{error}</div>)}</div>;
};

export default Errors;
