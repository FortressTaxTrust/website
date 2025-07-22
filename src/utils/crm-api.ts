import { api } from './auth';

// CRM API calls
export const getMyContact = async () => {
  const response = await api.get('/crm/my-contact');
  return response.data;
};

export const getLinkedAccountsByCognitoId = async (cognitoId: string) => {
  const response = await api.get(`/linked-accounts-by-cognito/${cognitoId}`);
  return response.data;
};

export const getAccountDetails = async (accountId: string) => {
  const response = await api.get(`/account-details/${accountId}`);
  return response.data;
};

export const getAccountsDetails = async (accountIds: string[]) => {
  const response = await api.post('/accounts-details', { accountIds });
  return response.data;
};

export const getAccountsWorkdriveFolders = async (accountIds: string[]) => {
  const response = await api.post('/accounts-workdrive-folders', { accountIds });
  return response.data;
};

// WorkDrive API calls
export const getWorkdriveFolderContents = async (folderId: string) => {
  const response = await api.get(`/workdrive/folder/${folderId}/contents`);
  return response.data;
};

export const getWorkdriveFileMetadata = async (fileId: string) => {
  const response = await api.get(`/workdrive/file/${fileId}`);
  return response.data;
};
