// components/AccountCard.tsx
import { FolderItem } from "./FolderView";

export interface Account {
  accountId: string;
  accountName: string;
  accountType?: string;
  industry?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}

interface WorkdriveFolder {
  workdriveFolderId?: string;
  workdriveFolderLink?: string;
}

interface AccountCardProps {
  account: Account;
  workdriveFolders: Record<string, WorkdriveFolder>;
  browsedFolder: Record<string, any>;
  onViewWorkdrive: (accountId: string) => void;
  onBrowseFolder: (accountId: string, folderId: string, path: string[]) => void;
}

export default function AccountCard({
  account,
  workdriveFolders,
  browsedFolder,
  onViewWorkdrive,
  onBrowseFolder,
}: AccountCardProps) {
  const folderInfo = workdriveFolders[account.accountId];
  const browse = browsedFolder[account.accountId];

  const handleBrowseClick = () => {
    if (folderInfo?.workdriveFolderId) {
      onBrowseFolder(account.accountId, folderInfo.workdriveFolderId, [account.accountName]);
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm mb-4">
      <div className="font-medium text-gray-800">{account.accountName}</div>
      <div className="text-sm text-gray-600">
        {account.accountType && <span>{account.accountType}</span>}
        {account.industry && <span> &middot; {account.industry}</span>}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          onClick={() => onViewWorkdrive(account.accountId)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
        >
          View WorkDrive
        </button>
        {folderInfo?.workdriveFolderId && (
          <button
            onClick={handleBrowseClick}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
          >
            Browse Folder
          </button>
        )}
      </div>
    </div>
  );
}
