export const USER_DATA_ENDPOINT = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'


export enum ReducerActions {
  BulkDeleteCompleted = 'BulkDeleteCompleted',
  BulkDeleteInitiated = 'BulkDeleteInitiated',
  SingleDeletedInitiated = 'SingleDeletedInitiated',
  SingleDeletedCompleted = 'SingleDeletedCompleted'
}