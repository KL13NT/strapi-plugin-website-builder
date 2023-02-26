import React from 'react';
import PropTypes from 'prop-types';
import { Tr, Td } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { IconButton } from '@strapi/design-system/IconButton';
import Trash from '@strapi/icons/Trash';

const getStatusColor = (status) => {
	if (status === '#') {
		return 'neutral600';
	} else if (status >= 200 && status < 400) {
		return 'success600';
	} else {
		return 'danger600';
	}
};

const getStatusText = (status) => {
	if (status === '#') {
		return 'Pending';
	} else if (status >= 200 && status < 400) {
		return 'Success';
	} else {
		return 'Failed';
	}
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
	hour12: true,
	timeStyle: 'short',
	dateStyle: 'long',
});

const LogTableRow = ({ log, handleBuildLogDelete }) => {
	const { id, status, trigger, createdAt, response } = log;

	return (
		<Tr>
			<Td>
				<Typography textColor="neutral900">{id}</Typography>
			</Td>
			<Td>
				<Typography textColor={getStatusColor(status)}>{getStatusText(status)}</Typography>
			</Td>
			<Td>
				<Typography
					textColor="neutral900"
					style={{
						wordWrap: 'break-word',
						whiteSpace: 'break-spaces',
					}}
				>
					{response || 'No response logged'}
				</Typography>
			</Td>
			<Td>
				<Typography textColor="neutral900">{trigger}</Typography>
			</Td>
			<Td>
				<Typography textColor="neutral900">{dateFormatter.format(new Date(createdAt))}</Typography>
			</Td>
			<Td>
				<IconButton
					onClick={() => handleBuildLogDelete(id)}
					label="Delete"
					noBorder
					icon={<Trash />}
				/>
			</Td>
		</Tr>
	);
};

LogTableRow.propTypes = {
	log: PropTypes.shape({
		id: PropTypes.string.isRequired,
		status: PropTypes.number.isRequired,
		trigger: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		response: PropTypes.string.isRequired,
	}).isRequired,
	handleBuildLogDelete: PropTypes.func.isRequired,
};

export { LogTableRow };
