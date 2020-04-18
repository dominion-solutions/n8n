import {ITimeIntervalDto} from "./CommonDtos";

interface ITimeEntriesDurationRequest {
	start: string;
	end: string;
}

export interface ITimeEntryRequest {
	id: string;
	start: string;
	billable: boolean;
	description: string;
	projectId: string;
	userId: string;
	taskId?: string;
	end: string;
	tagIds?: string[];
	timeInterval: ITimeEntriesDurationRequest;
	workspaceId: string;
	isLocked: boolean;
};

export interface ITimeEntryDto {
	billable: boolean;
	description: string;
	id: string;
	isLocked: boolean;
	projectId: string;
	tagIds: string[];
	taskId: string;
	timeInterval: ITimeIntervalDto;
	userId: string;
	workspaceId: string;
}

