import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNotification } from '@strapi/helper-plugin';
import { build, buildLogs } from '../api';
import { getTrad } from '../utils/getTrad';

const { triggerBuild } = build;
const { fetchBuildLogs, createBuildLog, deleteBuildLog, clearLogs } = buildLogs;

const useReactQuery = () => {
	const queryClient = useQueryClient();
	const toggleNotification = useNotification();

	// universal handlers
	const handleError = (error) => {
		const message = error.response ? error.response.error.message : error.message;
		toggleNotification({
			type: 'warning',
			message,
		});
	};

	const handleSuccess = ({ invalidate, notification }) => {
		if (invalidate) {
			queryClient.invalidateQueries(invalidate);
		}
		toggleNotification({
			type: notification.type,
			message: { id: getTrad(notification.tradId) },
		});
	};

	// build
	const buildMutations = {
		create: useMutation(triggerBuild, {
			onSuccess: () => {
				handleSuccess({
					invalidate: ['get-build-logs'],
					notification: {
						type: 'success',
						tradId: `build.notification.trigger.success`,
					},
				});
			},
			onError: (error) => handleError(error),
		}),
	};

	// build logs
	const buildLogQueries = {
		getBuildLogs: (params) => {
			return useQuery('get-build-logs', () => fetchBuildLogs(params).then((r) => r.data));
		},
	};

	const buildLogMutations = {
		delete: useMutation(deleteBuildLog, {
			onSuccess: () => {
				handleSuccess({
					invalidate: ['get-build-logs'],
					notification: {
						type: 'success',
						tradId: `build-logs.notification.delete.success`,
					},
				});
				handleSuccess({
					invalidate: querykey,
					notification: {
						type: 'success',
						tradId: `build-logs.notification.delete.success`,
					},
				});
			},
			onError: (error) => handleError(error),
		}),

		create: useMutation(createBuildLog, {
			onSuccess: () => {
				handleSuccess({
					invalidate: ['get-build-logs'],
				});
			},
			onError: (error) => handleError(error),
		}),
	};

	return { buildLogQueries, buildLogMutations, buildMutations };
};

export { useReactQuery };
