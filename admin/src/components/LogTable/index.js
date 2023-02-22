import React from 'react';
import { Table, Tbody } from '@strapi/design-system/Table';
import { LogTableHeaders } from './LogTableHeaders';
import { LogTableRow } from './LogTableRow';
import { useReactQuery } from '../../hooks/useReactQuery';

export const LogTable = ({ logs }) => {
	const { buildLogMutations } = useReactQuery();

	const handleBuildLogDelete = async (id) => {
		try {
			await buildLogMutations.delete.mutate({ id });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Table>
			<LogTableHeaders />
			<Tbody>
				{logs.map((log) => (
					<LogTableRow key={log.id} log={log} handleBuildLogDelete={handleBuildLogDelete} />
				))}
			</Tbody>
		</Table>
	);
};
