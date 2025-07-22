'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  getMyContact, 
  getLinkedAccountsByCognitoId, 
  getAccountDetails,
  getAccountsWorkdriveFolders,
  getWorkdriveFolderContents 
} from '@/utils/crm-api';
import { getCurrentUser } from '@/utils/auth';
import { 
  User, 
  Building2, 
  FolderOpen, 
  RefreshCw, 
  ExternalLink,
  ChevronRight,
  FileText,
  Folder,
  Download,
  ArrowLeft,
  LogOut
} from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface ContactData {
  id: string;
  Full_Name: string;
  Email: string;
  Phone?: string;
  WorkDrive_Link?: string;
  [key: string]: any;
}

interface LinkedAccount {
  relationshipId: string;
  accountId: string;
  accountName: string;
  accountNumber?: string;
  accountType?: string;
  industry?: string;
}

interface AccountDetails {
  id: string;
  accountName: string;
  accountNumber?: string;
  accountType?: string;
  industry?: string;
  billingAddress?: any;
  contactInfo?: any;
  description?: string;
  tin?: string;
  clientId?: string;
  workdriveFolderId?: string;
}

interface WorkDriveItem {
  id: string;
  name: string;
  type: string;
  created_time: string;
  permalink?: string;
  download_url?: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [selectedAccount, setSelectedAccount] = useState<AccountDetails | null>(null);
  const [workdriveFolderId, setWorkdriveFolderId] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<string[]>([]);

  // Get current user info from JWT
  const userInfo = getCurrentUser();
  const cognitoId = userInfo?.sub || user?.sub;

  // Fetch user's CRM contact
  const { data: contactData, isLoading: isLoadingContact, refetch: refetchContact } = useQuery({
    queryKey: ['myContact'],
    queryFn: getMyContact,
    onError: (error: any) => {
      console.error('Error fetching contact:', error);
      toast.error('Failed to load contact information');
    }
  });

  // Fetch linked accounts
  const { data: linkedAccountsData, isLoading: isLoadingAccounts, refetch: refetchAccounts } = useQuery({
    queryKey: ['linkedAccounts', cognitoId],
    queryFn: () => getLinkedAccountsByCognitoId(cognitoId!),
    enabled: !!cognitoId,
    onError: (error: any) => {
      console.error('Error fetching linked accounts:', error);
      toast.error('Failed to load linked accounts');
    }
  });

  // Fetch selected account details
  const { data: accountDetailsData } = useQuery({
    queryKey: ['accountDetails', selectedAccount?.id],
    queryFn: () => getAccountDetails(selectedAccount!.id),
    enabled: !!selectedAccount?.id,
    onSuccess: (data) => {
      if (data.accountDetails?.workdriveFolderId) {
        const folderId = extractFolderId(data.accountDetails.workdriveFolderId);
        setWorkdriveFolderId(folderId);
        setFolderPath([data.accountDetails.accountName]);
      }
    }
  });

  // Fetch WorkDrive folder contents
  const { data: folderContents, isLoading: isLoadingFolder } = useQuery({
    queryKey: ['workdriveFolder', workdriveFolderId],
    queryFn: () => getWorkdriveFolderContents(workdriveFolderId!),
    enabled: !!workdriveFolderId,
    onError: (error: any) => {
      console.error('Error fetching folder contents:', error);
      toast.error('Failed to load folder contents. WorkDrive access may be required.');
    }
  });

  const extractFolderId = (link: string): string | null => {
    if (!link) return null;
    const parts = link.split('/');
    return parts[parts.length - 1];
  };

  const handleAccountClick = (account: LinkedAccount) => {
    setSelectedAccount({
      id: account.accountId,
      accountName: account.accountName,
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      industry: account.industry
    });
  };

  const handleFolderClick = (item: WorkDriveItem) => {
    if (item.type === 'folder') {
      setWorkdriveFolderId(item.id);
      setFolderPath([...folderPath, item.name]);
    }
  };

  const handleBackClick = () => {
    if (folderPath.length > 1) {
      setFolderPath(folderPath.slice(0, -1));
      // In a real app, you'd need to track parent folder IDs
      // For now, we'll just clear the view
      setWorkdriveFolderId(null);
    } else {
      setSelectedAccount(null);
      setWorkdriveFolderId(null);
      setFolderPath([]);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <ProtectedRoute>
      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
              <p className="mt-1 text-gray-600">Welcome back, {userInfo?.given_name || user?.username}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* My Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    My Information
                  </h2>
                  <button
                    onClick={() => refetchContact()}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Refresh"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                {isLoadingContact ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  </div>
                ) : contactData?.contactData ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{contactData.contactData.Full_Name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{contactData.contactData.Email || userInfo?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{contactData.contactData.Phone || 'N/A'}</p>
                    </div>
                    {contactData.contactData.WorkDrive_Link && (
                      <div>
                        <p className="text-sm text-gray-500">WorkDrive</p>
                        <a
                          href={contactData.contactData.WorkDrive_Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          View Folder
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No contact information found</p>
                )}
              </div>

              {/* Linked Accounts */}
              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-green-600" />
                    Linked Accounts
                  </h2>
                  <button
                    onClick={() => refetchAccounts()}
                    className="p-1 hover:bg-gray-100 rounded"
                    title="Refresh"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                {isLoadingAccounts ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ) : linkedAccountsData?.linkedAccounts?.length > 0 ? (
                  <div className="space-y-2">
                    {linkedAccountsData.linkedAccounts.map((account: LinkedAccount) => (
                      <button
                        key={account.accountId}
                        onClick={() => handleAccountClick(account)}
                        className="w-full text-left p-3 rounded-md hover:bg-gray-50 border border-gray-200 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{account.accountName}</p>
                            <p className="text-sm text-gray-500">
                              {account.accountType} {account.industry && `• ${account.industry}`}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No linked accounts found</p>
                )}
              </div>
            </div>

            {/* Account Details and WorkDrive Browser */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                {selectedAccount ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <button
                          onClick={handleBackClick}
                          className="mr-3 p-1 hover:bg-gray-100 rounded"
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-semibold">{selectedAccount.accountName}</h2>
                      </div>
                    </div>

                    {accountDetailsData?.accountDetails && (
                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Account Type</p>
                          <p className="font-medium">{accountDetailsData.accountDetails.accountType || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Industry</p>
                          <p className="font-medium">{accountDetailsData.accountDetails.industry || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">TIN</p>
                          <p className="font-medium">{accountDetailsData.accountDetails.tin || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Client ID</p>
                          <p className="font-medium">{accountDetailsData.accountDetails.clientId || 'N/A'}</p>
                        </div>
                      </div>
                    )}

                    {/* WorkDrive Browser */}
                    {workdriveFolderId && (
                      <div className="border-t pt-4">
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <FolderOpen className="h-5 w-5 mr-2 text-yellow-600" />
                          WorkDrive Files
                        </h3>
                        
                        {/* Breadcrumb */}
                        <div className="mb-4 text-sm">
                          <span className="text-gray-500">Path: </span>
                          {folderPath.map((path, index) => (
                            <span key={index}>
                              {index > 0 && <span className="mx-1">/</span>}
                              <span className="font-medium">{path}</span>
                            </span>
                          ))}
                        </div>

                        {isLoadingFolder ? (
                          <div className="space-y-2">
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        ) : folderContents?.files?.length > 0 ? (
                          <div className="space-y-2">
                            {folderContents.files.map((item: WorkDriveItem) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 border border-gray-200"
                              >
                                <div className="flex items-center">
                                  {item.type === 'folder' ? (
                                    <Folder className="h-5 w-5 mr-3 text-yellow-500" />
                                  ) : (
                                    <FileText className="h-5 w-5 mr-3 text-gray-400" />
                                  )}
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(item.created_time).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {item.type === 'folder' ? (
                                    <button
                                      onClick={() => handleFolderClick(item)}
                                      className="p-2 hover:bg-gray-200 rounded"
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </button>
                                  ) : (
                                    <>
                                      {item.permalink && (
                                        <a
                                          href={item.permalink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-2 hover:bg-gray-200 rounded"
                                          title="View"
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                        </a>
                                      )}
                                      {item.download_url && (
                                        <a
                                          href={item.download_url}
                                          download
                                          className="p-2 hover:bg-gray-200 rounded"
                                          title="Download"
                                        >
                                          <Download className="h-4 w-4" />
                                        </a>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No files found in this folder</p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select an account to view details and files</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}