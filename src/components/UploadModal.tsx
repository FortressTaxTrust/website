"use client";

import { useEffect, useMemo, useState, DragEvent } from "react";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  IconButton,
  Card,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Tooltip,
  Chip,
  Box,
  Stack,
  InputLabel,
} from "@mui/material";
import {
  Image,
  FileText,
  FileSpreadsheet,
  X,
  FolderOpen,
  FolderPlus,
  Sparkles,
} from "lucide-react";
import FolderTreeDialog from "./FolderTreeDialog";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountsData: any[];
  onUpload: (
    files: File[],
    account: string,
    payload: Array<{
      filename: string;
      fileType: string;
      selectedFolderPath?: {
        folder_id: string | null;
        parent_id: string | null;
        name: string | null;
      } | null;
      documentType?: string | null;
      analysis?: any | null;
    }>
  ) => void;
}

type FolderNode = {
  folder_id: string | null;
  name: string;
  parent_id: string | null;
};

export default function UploadModal({
  isOpen,
  onClose,
  onUpload,
  accountsData,
}: UploadModalProps) {
  const router = useRouter();
  if (!isOpen) return null;
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisByIndex, setAnalysisByIndex] = useState<Record<number, any>>(
    {}
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [analyzing, setAnalyzing] = useState(false);
  const [context, setContext] = useState("");
  const [docTypeByIndex, setDocTypeByIndex] = useState<Record<number, string>>(
    {}
  );
  const [folderPathByIndex, setFolderPathByIndex] = useState<
    Record<
      number,
      {
        folder_id: string | null;
        parent_id: string | null;
        name: string | null;
      }
    >
  >({});

  // Folder Picker
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTargetIndex, setPickerTargetIndex] = useState<number | null>(
    null
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setSelectedRows((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
    setDocTypeByIndex((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
    setFolderPathByIndex((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
    setAnalysisByIndex((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
  };

  const runAnalysisUnassigned = async () => {
    const toAnalyze = files
      .map((f, i) => ({ file: f, index: i }))
      .filter(({ index }) => !folderPathByIndex[index]);
    if (!toAnalyze.length) return;

    setAnalyzing(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/analyze-files/and/create-folders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            files: toAnalyze.map(({ file }) => ({
              filename: file.name,
              fileType: file.type,
            })),
            userContext: context || null,
          }),
        }
      );
      if (!res.ok) setError("Failed to Analyze or Login again!");
      const data = await res.json();
      const byName: Record<string, any> = {};
      (data.analyses || []).forEach((a: any) => (byName[a.filename] = a));

      const newAnalysis: Record<number, any> = {};
      const newFolderPaths = { ...folderPathByIndex };

      toAnalyze.forEach(({ file, index }) => {
        newAnalysis[index] = byName[file?.name];
        if (byName[file?.name]?.analysis?.suggested_path) {
          newFolderPaths[index] = {
            ...newFolderPaths[index],
            name: byName[file?.name]?.analysis.suggested_path,
            folder_id: null,
            parent_id: null,
          };
        }
      });

      setAnalysisByIndex((prev) => ({ ...prev, ...newAnalysis }));
      setFolderPathByIndex(newFolderPaths);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

const uploadAndAnalyze = async () => {
  if (!files?.length && !account) return;

  setAnalyzing(true);
  setError(null);
  setSuccessMessage(null);

  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file, file.name);
    });
    if (context) formData.append("userContext", JSON.stringify(context));
    formData.append("accountId", account);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ai/analyze-files`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const data = await res.json();
    if (!res.ok){
      console.log("res",res)
      setError(data.message || "Failed to upload and analyse files");
    } else {
        console.log("Analysis & upload result:", data);
       // Show success message
        setSuccessMessage("Files uploaded successfully! Your files will be available within 24hrs");
        setFiles([]);
        setSelectedRows({});
        setAccount("");
        setContext("");
        setDocTypeByIndex({});
        setFolderPathByIndex({});
        setAnalysisByIndex({});
    }
  } catch (e) {
    console.error(e);
    setError("Failed to upload file.");
  } finally {
    setAnalyzing(false);
  }
};




  const openPickerFor = (idx: number) => {
    setPickerTargetIndex(idx);
    setPickerOpen(true);
  };

  const onPickFolder = (node: FolderNode) => {
    setFolderPathByIndex((prev) => ({
      ...prev,
      [pickerTargetIndex!]: {
        folder_id: node.folder_id,
        parent_id: node.parent_id,
        name: node.name,
      },
    }));
    setAnalysisByIndex((prev) => {
      const copy = { ...prev };
      delete copy[pickerTargetIndex!];
      return copy;
    });
    setPickerTargetIndex(null);
  };

  const handleConfirmUpload = () => {
    if (!account || !files.length) return;
    const payload = files.map((f, i) => ({
      filename: f.name,
      fileType: f.type,
      selectedFolderPath: folderPathByIndex[i] || null,
      documentType: docTypeByIndex[i] || null,
      analysis: analysisByIndex[i] || null,
    }));
    onUpload(files, account, payload);
    setFiles([]);
    setSelectedRows({});
    setAccount("");
    setContext("");
    setDocTypeByIndex({});
    setFolderPathByIndex({});
    setAnalysisByIndex({});
  };

  
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/"))
      return <Image className="w-5 h-5 text-primary" />;
    if (file.type.includes("pdf"))
      return <FileText className="w-5 h-5 text-secondary" />;
    if (
      file.type.includes("sheet") ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".csv")
    )
      return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
    return <FileText className="w-5 h-5 text-gray-600" />;
  };

  const allSelected = useMemo(
    () => (files.length ? files.every((_, i) => selectedRows[i]) : false),
    [files, selectedRows]
  );
  const toggleSelectAll = (checked: boolean) => {
    if (!files.length) return;
    const next: Record<number, boolean> = {};
    files.forEach((_, i) => (next[i] = checked));
    setSelectedRows(next);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          className: "rounded-lg w-full max-w-4xl",
          sx: { display: "flex", flexDirection: "column", maxHeight: "90vh" },
        }}
      >
        <Box className="flex items-center justify-between w-full border-b p-2 mb-3">
          {/* Left: Title */}
          <DialogTitle className="!p-0 font-inter font-bold text-primary text-xl">
            📂 Upload & Organize Documents
          </DialogTitle>

          {/* Right: Error (if exists) */}
          {error && (
            <Box className="flex items-center gap-1 border border-red-300 bg-red-50 rounded-lg px-2 py-1">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <Typography
                variant="body2"
                className="text-red-600 font-medium text-sm"
              >
                {error}
              </Typography>
            </Box>
          )}
           {successMessage && (
            <Box className="flex items-center gap-1 border border-blue-300 bg-blue-50 rounded-lg px-2 py-1">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <Typography
                variant="body2"
                className="text-blue-600 font-medium text-sm"
              >
                {successMessage}
              </Typography>
            </Box>
          )}
        </Box>

        <DialogContent
          dividers
          className="grid gap-4 max-h-[80vh] overflow-y-auto p-2 sm:p-4"
        >
          {/* Account & Context */}
          <Box className="grid gap-3 grid-cols-1 md:grid-cols-[1fr_2fr] items-center">
            <Box>
              <InputLabel className="mb-1 text-gray-600 text-sm">
                Select Account
              </InputLabel>
              <FormControl size="small" fullWidth>
                <Select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  displayEmpty
                  className="text-gray-800"
                >
                  {loading ? (
                    <MenuItem disabled>Loading accounts...</MenuItem>
                  ) : accountsData.length === 0 ? (
                    <MenuItem disabled>No accounts found</MenuItem>
                  ) : (
                    accountsData.map((acc) => (
                      <MenuItem key={acc.accountId} value={acc.accountId}>
                        {acc.accountName}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Box>

            {/* <Box>
              <InputLabel className="mb-1 text-gray-600 text-sm">
                Business Context (optional)
              </InputLabel>
              <TextField
                placeholder="Add helpful context"
                size="small"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                fullWidth
                className="text-gray-800"
              />
            </Box> */}
          </Box>

          {/* Drag & Drop */}
          <Box
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-gray-400 rounded-lg p-4 text-center hover:border-primary hover:bg-gray-50 transition-colors duration-200"
          >
            <Typography className="text-gray-500 text-sm mb-2">
              Drag & Drop files here or
            </Typography>
            <label className="cursor-pointer inline-block">
              <span className="group relative flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-[#5A6863] hover:bg-[#535353] transition-colors">
                Browse Files
              </span>
              <input type="file" multiple hidden onChange={handleFileChange} />
            </label>
          </Box>

          {/* File List */}
          {files.length > 0 && (
            <Card
              variant="outlined"
              className="border-gray-300 rounded-lg overflow-x-auto"
            >
              <Box className="p-3 flex flex-col gap-3">
                <Typography className="font-inter font-semibold text-gray-800 text-lg">
                  Files ({files.length})
                </Typography>

                <Box className="overflow-x-auto max-h-[300px] overflow-y-auto">
                  <Table size="small" stickyHeader className="min-w-[600px]">
                    <TableHead>
                      <TableRow className="bg-gray-100">
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={allSelected}
                            onChange={(e) => toggleSelectAll(e.target.checked)}
                          />
                        </TableCell>
                        <TableCell>File</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Folder</TableCell>
                        <TableCell width={200}>Select Folder</TableCell>
                        <TableCell width={200}>Analysis</TableCell>
                        <TableCell align="right">Remove</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {files.map((f, idx) => {
                        const folder = folderPathByIndex[idx];
                        const ai = analysisByIndex[idx]?.analysis;

                        return (
                          <TableRow key={idx} hover>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={!!selectedRows[idx]}
                                onChange={(e) =>
                                  setSelectedRows((prev) => ({
                                    ...prev,
                                    [idx]: e.target.checked,
                                  }))
                                }
                              />
                            </TableCell>

                            <TableCell>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                className="max-w-[350px] sm:max-w-[500px]" // increased max width
                              >
                                {getFileIcon(f)}
                                <Typography
                                  className="text-gray-800 text-sm truncate" // truncate long names
                                  title={f.name}
                                >
                                  {f.name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell>
                              <Chip
                                size="small"
                                label={f.type || "unknown"}
                                variant="outlined"
                                className="border-gray-300 text-gray-500"
                              />
                            </TableCell>

                            <TableCell className="min-w-[180px]">
                              {folder?.name ? (
                                folder.name
                              ) : (
                                <Typography className="text-yellow-600 text-sm">
                                  Not selected
                                </Typography>
                              )}
                            </TableCell> 

                             <TableCell>
                              <Stack
                                direction="row"
                                spacing={2}
                                flexWrap="wrap"
                              >
                                <Button
                                  size="small"
                                  startIcon={<FolderOpen size={16} />}
                                  className="font-inter text-gray-800 border-gray-400 hover:border-primary hover:text-primary transition-colors"
                                  onClick={() => openPickerFor(idx)}
                                />
                              </Stack>
                            </TableCell>

                            <TableCell>
                              {!folder?.folder_id && ai ? (
                                <div className="p-1 border border-gray-300 bg-gray-50 rounded-sm">
                                  <p className="text-gray-800 text-xs break-words">
                                    <b>Suggested:</b> {ai?.suggested_path}
                                  </p>
                                  <p className="text-gray-500 text-[10px] mt-0.5">
                                    <b>Category:</b> {ai?.category}
                                  </p>
                                </div>
                              ) : (
                                <Typography className="text-gray-500 text-sm">
                                  N/A
                                </Typography>
                              )}
                            </TableCell>

                            <TableCell align="right">
                              <IconButton
                                size="small"
                                onClick={() => removeFile(idx)}
                                className="hover:bg-gray-100 transition-colors"
                              >
                                <X className="w-4 h-4 text-gray-600" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Card>
          )}
        </DialogContent>

        <DialogActions className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3 p-3">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="py-2 px-4 text-sm font-inter font-medium text-[#535353] border border-[#B8B8B8] rounded-md hover:border-[#5A6863] hover:text-[#5A6863] transition-colors"
          >
            {successMessage ? "Close" : "Cancel"}
          </button>

          {/* Analyze Unassigned Button */}
           {/* {!successMessage && (
          <button
            onClick={uploadAndAnalyze}
            disabled={
              analyzing || files.every((_, i) => !!folderPathByIndex[i]?.name)
            }
            className="py-2 px-4 text-sm font-inter font-medium text-[#535353] border border-[#B8B8B8] rounded-md flex items-center gap-2 hover:border-[#5A6863] hover:text-[#5A6863] transition-colors disabled:opacity-50"
          >
            {analyzing ? (
              <CircularProgress size={16} />
            ) : (
              <>
                <Sparkles size={16} />
                Analyze & Upload
              </>
            )}
          </button>
           )} */}
          {/* Confirm Button */}
          <button
            onClick={handleConfirmUpload}
            disabled={!files.length || !account || !folderPathByIndex}
            className="py-2 px-4 text-sm font-inter font-medium text-[#FFFFFF] rounded-md bg-[#5A6863] hover:bg-[#535353] transition-colors disabled:opacity-50"
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog>

      {/* Folder Picker */}
      {pickerOpen && (
        <FolderTreeDialog
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          accountId={account}
          onSelectPath={onPickFolder}
        />
      )}
    </>
  );
}
