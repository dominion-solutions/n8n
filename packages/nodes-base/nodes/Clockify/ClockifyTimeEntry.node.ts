import { IExecuteFunctions } from 'n8n-core';
import {
	ILoadOptionsFunctions,
	INodeExecutionData, INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import {IWorkspaceDto} from "./WorkpaceInterfaces";
import {clockifyApiRequest} from "./GenericFunctions";


export class ClockifyTimeEntry implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Clockify Time Entry',
		name: 'clockify',
		icon: 'file:images/clockify-mark-blue.png',
		group: ['transform'],
		version: 1,
		description: 'Write a Time Entry to Clockify',
		defaults: {
			name: 'Clockify',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'clockifyApi',
				required: true,
			}
		],
		properties: [
			{
				displayName: 'Workspace',
				name: 'workspaceId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'listWorkspaces',
				},
				required: true,
				default: '',
			},
			{
				displayName: 'Create Project if Missing',
				name: 'createProject',
				type: 'boolean',
				required: true,
				default: false,
			},
		]
	};

	methods = {
		loadOptions: {
			async listWorkspaces(this: ILoadOptionsFunctions) : Promise<INodePropertyOptions[]> {
				const rtv : INodePropertyOptions[] = [];
				const  workspaces: IWorkspaceDto[] = await clockifyApiRequest.call(this,'GET', 'workspaces');
				if(undefined !== workspaces) {
					workspaces.forEach(value => {
						rtv.push(
							{
								name: value.name,
								value: value.id,
							});
					});
				}
				return rtv;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const items = this.getInputData();

		// let item: INodeExecutionData;
		// let myString: string;
		//
		// // Itterates over all input items and add the key "myString" with the
		// // value the parameter "myString" resolves to.
		// // (This could be a different value for each item in case it contains an expression)
		// for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
		// 	myString = this.getNodeParameter('myString', itemIndex, '') as string;
		// 	item = items[itemIndex];
		//
		// 	item.json['myString'] = myString;
		// }

		return this.prepareOutputData(items);

	}
}
