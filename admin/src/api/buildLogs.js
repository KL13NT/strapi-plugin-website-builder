import { requestPluginEndpoint } from '../utils/requestPluginEndpoint';

const route = 'logs';

const fetchBuildLogs = () => {
	return requestPluginEndpoint(route);
};

const createBuildLog = ({ status, response }) => {
	return requestPluginEndpoint('actions', {
		method: 'POST',
		body: {
			status,
			response,
		},
	});
};

const deleteBuildLog = ({ id }) => {
	return requestPluginEndpoint(`${route}/${id}`, {
		method: 'DELETE',
	});
};

export { fetchBuildLogs, deleteBuildLog, createBuildLog };
