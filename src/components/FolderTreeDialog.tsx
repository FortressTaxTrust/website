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
  ListItemButton,
  Box
} from "@mui/material";
import {
  ChevronDown,
  ChevronRight,
  Folder as FolderIcon,
  FolderPlus,
  Loader2,
} from "lucide-react";

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
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [rootFolderId, setRootFolderId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFolders([]);
      setExpanded({});
      setLoading({});
      setNewFolderParent(null);
      setNewFolderName("");
      setSelectedFolder(null);
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
      setRootFolderId(rootId);

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
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zoho/create-folder`, {
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

  const handleConfirmSelection = () => {
    if (selectedFolder) {
      onSelectPath?.({
        parent_id: selectedFolder.parentId || rootFolderId,
        folder_id: selectedFolder.id || rootFolderId,
        name: selectedFolder.name,
      });
      onClose();
    }
  };

  const renderTree = (folder: Folder, level: number = 0) => {
    const isLoading = loading[folder.id];
    const isExpanded = expanded[folder.id];
    const hasChildren = folder.children && folder.children.length > 0;
    const notLoadedYet = folder.children === undefined;
    const isSelected = selectedFolder?.id === folder.id;

    return (
      <Box key={folder.id}>
        <ListItem disablePadding sx={{ pl: level * 2, my: 0.5 }}>
          <ListItemButton
            selected={isSelected}
            onClick={async () => {
              setSelectedFolder(folder);
              if (folder.hasSubfolders) {
                if (notLoadedYet) {
                  await loadChildren(folder.id, folder);
                } else {
                  setExpanded((prev) => ({ ...prev, [folder.id]: !prev[folder.id] }));
                }
              }
            }}
            sx={{ borderRadius: 1, py: 0.5, display: "flex", alignItems: "center", gap: 1 }}
          >
            <IconButton
              size="small"
              sx={{ visibility: folder.hasSubfolders ? "visible" : "hidden" }}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </IconButton>

            <FolderIcon size={18} className="text-yellow-500 flex-shrink-0" />

            <ListItemText
              primary={folder.name}
              primaryTypographyProps={{
                variant: "body2",
                sx: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
              }}
            />

            <IconButton
              size="small"
              title="Create subfolder"
              onClick={async (e) => {
                e.stopPropagation();
                setNewFolderParent(newFolderParent === folder.id ? null : folder.id);
                setNewFolderName("");
                if (notLoadedYet) await loadChildren(folder.id, folder);
                if (!isExpanded) setExpanded((prev) => ({ ...prev, [folder.id]: true }));
              }}
            >
              <FolderPlus size={16} className="text-gray-500 hover:text-primary" />
            </IconButton>
          </ListItemButton>
        </ListItem>

        {newFolderParent === folder.id && (
          <Box sx={{ pl: (level + 2) * 2, my: 1 }} className="flex gap-2 items-center">
            <TextField
              autoFocus
              size="small"
              placeholder="New folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateFolder(folder.id)}
              sx={{ flexGrow: 1, "& .MuiInputBase-root": { fontSize: "0.875rem" } }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => handleCreateFolder(folder.id)}
              disabled={!newFolderName.trim()}
              sx={{ backgroundColor: "#5A6863", "&:hover": { backgroundColor: "#535353" } }}
            >
              Create
            </Button>
          </Box>
        )}

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {isLoading ? (
              [...Array(2)].map((_, idx) => (
                <ListItem key={idx} sx={{ pl: (level + 1) * 2, gap: 2 }}>
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton variant="text" width="80%" />
                </ListItem>
              ))
            ) : hasChildren ? (
              folder.children!.map((child) => renderTree(child, level + 1))
            ) : (
              <ListItem sx={{ pl: (level + 1) * 2 }}>
                <ListItemText
                  primary="No subfolders"
                  primaryTypographyProps={{
                    variant: "body2",
                    fontStyle: "italic",
                    color: "text.secondary",
                  }}
                />
              </ListItem>
            )}
          </List>
        </Collapse>
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="h6" component="div">
          Select Destination
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {selectedFolder ? `Selected: ${selectedFolder.name}` : "Choose a folder"}
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 1, minHeight: "400px", maxHeight: "60vh" }}>
        {errorMsg ? (
          <Typography color="error" className="text-sm text-center py-4">
            {errorMsg}
          </Typography>
        ) : loadingRoot ? (
          <>
            {[...Array(5)].map((_, idx) => (
              <ListItem key={idx} sx={{ gap: 2 }}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="text" width="80%" />
              </ListItem>
            ))}
          </>
        ) : folders.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
            No folders found.
          </Typography>
        ) : (
          <List>{folders.map((f) => renderTree(f))}</List>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmSelection}
          variant="contained"
          disabled={!selectedFolder}
          sx={{ backgroundColor: "#5A6863", "&:hover": { backgroundColor: "#535353" } }}
        >
          Select Folder
        </Button>
      </DialogActions>
    </Dialog>
  );
}
