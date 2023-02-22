/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { NoContent } from '@strapi/helper-plugin';

import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Stack } from '@strapi/design-system/Stack';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { LogTable } from '../../components/LogTable';

import Publish from '@strapi/icons/Play';
import Trash from '@strapi/icons/Trash';

import { useReactQuery } from '../../hooks/useReactQuery';

const pending = {
	id: '#',
	status: '#',
	response: 'The build is pending',
	trigger: 'manual',
	createdAt: new Date().toISOString(),
};

const HomePage = () => {
	const { buildLogQueries, buildMutations, buildLogMutations } = useReactQuery();
	const { data } = buildLogQueries.getBuildLogs();
	const { isLoading: isBuildPending } = buildMutations.create;

	const handleTrigger = async () => {
		try {
			buildMutations.create.mutate();
		} catch (error) {}
	};

	const handleClear = async () => {
		try {
			await buildLogMutations.clear.mutate();
		} catch (error) {}
	};

	const logs = data ? data.logs : [];
	const merged = isBuildPending ? [pending, ...logs] : logs;
	const isEmpty = merged.length === 0;

	return (
		<Box>
			<HeaderLayout
				secondaryAction={
					<Button
						onClick={handleTrigger}
						variant="primary"
						startIcon={<Publish />}
						size="L"
						disabled={isBuildPending}
					>
						{isBuildPending ? 'Build in progress' : 'Trigger Build'}
					</Button>
				}
				primaryAction={
					<Button
						onClick={handleClear}
						variant="danger-light"
						startIcon={<Trash />}
						size="S"
						disabled={isBuildPending}
					>
						Clear builds
					</Button>
				}
				title="Website Builder"
				subtitle="The right way to build websites."
			/>

			<ContentLayout>
				<Stack size={4}>
					{isEmpty ? (
						<NoContent
							content={{
								id: 'Settings.apiTokens.emptyStateLayout',
								defaultMessage: 'No Build logs',
							}}
						/>
					) : (
						<LogTable logs={merged} />
					)}
				</Stack>
			</ContentLayout>
		</Box>
	);
};

export default memo(HomePage);
