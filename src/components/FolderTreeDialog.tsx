"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
  TextField,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, CreateNewFolder } from "@mui/icons-material";

interface Folder {
  id: string;
  name: string;
  hasSubfolders: boolean;
  children?: Folder[] | undefined; // undefined = not loaded yet
  parentId?: string | null;
}

interface FolderTreeDialogProps {
  open: boolean;
  onClose: () => void;
  accountId?: string;
  suggestForFilename?: string;
  suggestForDocType?: string | null;
  suggestContext?: string | null;
  onSelectPath?: (folder: { parent_id: string | null; folder_id: string | null; name: string }) => void;
}

export default function FolderTreeDialog({
  open,
  onClose,
  accountId,
  suggestForFilename,
  suggestForDocType,
  suggestContext,
  onSelectPath,
}: FolderTreeDialogProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [newFolderParent, setNewFolderParent] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [loadingRoot, setLoadingRoot] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (open) {
      setFolders([]);
      setExpanded({});
      setLoading({});
      setNewFolderParent(null);
      setNewFolderName("");
      setErrorMsg("");

      if (!accountId) {
        setErrorMsg("Please select account to get folders list");
        return;
      }

      fetchRootFolder();
    }
  }, [open, accountId]);

  const fetchRootFolder = async () => {
    setLoadingRoot(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Missing token");

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/zoho/accounts-workdrive-folders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ accountIds: [accountId] }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch account root");

      const rootId = data.accounts?.[0]?.workdriveFolderId;
      if (!rootId) throw new Error("No root folderId found");

      await loadChildren(rootId, null, true);
    } catch (err) {
      console.error("Failed to fetch root folder", err);
      setErrorMsg("Failed to fetch folders. Please try again.");
    } finally {
      setLoadingRoot(false);
    }
  };

  const loadChildren = async (parentId: string, parentNode: Folder | null, isRoot: boolean = false) => {
    try {
      setLoading((prev) => ({ ...prev, [parentId]: true }));
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Missing token");

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/zoho/workdrive/folder/${parentId}/contents`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch folders");

      const children: Folder[] = (data.files || [])
        .filter((f: any) => f.attributes.type === "folder")
        .map((f: any) => ({
          id: f.id,
          name: f.attributes.name,
          hasSubfolders: true,
          children: undefined,
          parentId,
        }));

      if (isRoot) {
        setFolders(children);
      } else if (parentNode) {
        const updateTree = (nodes: Folder[]): Folder[] =>
          nodes.map((f) =>
            f.id === parentNode.id ? { ...f, children } : { ...f, children: f.children ? updateTree(f.children) : f.children }
          );
        setFolders((prev) => updateTree(prev));
      }

      setExpanded((prev) => ({ ...prev, [parentId]: true }));
    } catch (err) {
      console.error("Failed to fetch folders", err);
      setErrorMsg("Failed to load folders. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, [parentId]: false }));
    }
  };

  const handleCreateFolder = async (parentId: string) => {
    if (!newFolderName.trim()) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Missing token");

      const res = await fetch(`/api/zoho/create-folder`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          parentId,
          accountId,
          name: newFolderName,
          context: suggestContext,
          suggestedFor: suggestForDocType || suggestForFilename || "",
        }),
      });

      const newFolder = await res.json();
      newFolder.children = undefined;
      newFolder.parentId = parentId;

      const addFolder = (nodes: Folder[]): Folder[] =>
        nodes.map((f) =>
          f.id === parentId
            ? { ...f, children: [...(f.children || []), newFolder] }
            : { ...f, children: f.children ? addFolder(f.children) : f.children }
        );

      setFolders((prev) => addFolder(prev));
      setNewFolderName("");
      setNewFolderParent(null);
      setExpanded((prev) => ({ ...prev, [parentId]: true }));
    } catch (err) {
      console.error("Failed to create folder", err);
      setErrorMsg("Failed to create folder. Please try again.");
    }
  };

  const renderTree = (folder: Folder, level: number = 0) => {
    const isLoading = loading[folder.id];
    const hasChildren = folder.children && folder.children.length > 0;
    const notLoadedYet = folder.children === undefined;

    return (
      <div key={folder.id} className="w-full text-sm">
        <ListItem
          button
          className={`rounded hover:bg-gray-100 px-2 py-1 ml-${level * 4} flex items-center justify-between`}
        >
          <div className="flex items-center gap-1">
            {folder.hasSubfolders && (
              <IconButton
                size="small"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (notLoadedYet) {
                    await loadChildren(folder.id, folder);
                  }
                  setExpanded((prev) => ({ ...prev, [folder.id]: !prev[folder.id] }));
                }}
              >
                {expanded[folder.id] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}

            <span
              className="cursor-pointer"
              onClick={() => {
                onSelectPath?.({
                  parent_id: folder.parentId || null,
                  folder_id: folder.id,
                  name: folder.name,
                });
                onClose();
              }}
            >
              {folder.name}
            </span>
          </div>

          {/* <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setNewFolderParent(newFolderParent === folder.id ? null : folder.id);
            }}
          >
            <CreateNewFolder className="text-gray-500" />
          </IconButton> */}
        </ListItem>

        {newFolderParent === folder.id && (
          <div className={`ml-${(level + 1) * 4} flex gap-2 items-center my-1 flex-wrap`}>
            <TextField
              size="small"
              placeholder={
                suggestForFilename
                  ? `Suggested: ${suggestForFilename.split(".")[0]}`
                  : "New folder name"
              }
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="bg-gray-50 rounded text-sm flex-1 min-w-[150px]"
            />

            <button
            onClick={() => handleCreateFolder(folder.id)}
            className="py-2 px-4 text-sm font-inter font-medium text-[#FFFFFF] rounded-md bg-[#5A6863] hover:bg-[#535353] transition-colors disabled:opacity-50"
          >
            Create
          </button>
          </div>
        )}

        <Collapse in={expanded[folder.id]} timeout="auto" unmountOnExit>
          <List disablePadding className={`ml-${(level + 1) * 4}`}>
            {isLoading || notLoadedYet ? (
              <>
                {[...Array(3)].map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="rectangular"
                    width="90%"
                    height={24}
                    className="my-1 rounded"
                  />
                ))}
              </>
            ) : hasChildren ? (
              folder.children!.map((child) => renderTree(child, level + 1))
            ) : (
              <ListItem>
                <ListItemText
                  primary="No folders"
                  className="text-gray-400 italic text-sm"
                />
              </ListItem>
            )}
          </List>
        </Collapse>
      </div>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle className="text-sm font-medium">Select or Create Folder</DialogTitle>
      <DialogContent dividers className="max-h-[600px] overflow-y-auto p-2 text-sm">
        {errorMsg ? (
          <Typography color="error" className="text-sm text-center py-4">
            {errorMsg}
          </Typography>
        ) : loadingRoot ? (
          <>
            {[...Array(3)].map((_, idx) => (
              <Skeleton
                key={idx}
                variant="rectangular"
                width="100%"
                height={28}
                className="my-1 rounded"
              />
            ))}
          </>
        ) : folders.length === 0 ? (
          <p className="text-gray-500 text-sm">No folders found.</p>
        ) : (
          <List>{folders.map((f) => renderTree(f))}</List>
        )}
      </DialogContent>
      <DialogActions className="flex flex-wrap gap-2">
        <Button onClick={onClose} variant="outlined" color="secondary" size="small">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
