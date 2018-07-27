import tv4 from 'tv4';

function createMiddleWare(schema, valid) {
	return ({ dispatch, getState }) => next => action => {
		next(action);
		const result = tv4.validateResult(getState(), schema);
		if (!result.valid) {
			console.log(
				'%cState Validation Failed:',
				'background: #e74c3c; color: white',
				{
					[result.error.dataPath]: {
						message: result.error.message,
						validation: result.error.params
					}
				}
			);
		} else {
			if (valid) {
				return console.info(
					'%cState Validation Passing',
					'background: #27ae60; color: white'
				);
			}
		}
	};
}

const ReduxJsonSchema = createMiddleWare();
ReduxJsonSchema.Schema = createMiddleWare;

export default ReduxJsonSchema;
