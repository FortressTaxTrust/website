"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Upload,
  CheckCircle,
  X,
  FileCheck,
  Loader2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Badge,
  Award,
  ShieldCheck,
  AlertCircle,
} from "lucide-react"

interface Account {
  id: string
  name: string
  accountType?: "Individual" | "business"
}

interface UploadDocumentsStepProps {
  onClose: () => void
  accounts: Account[]
}

interface AccountFileQueue {
  [accountId: string]: { [docName: string]: { file: File; error?: string }[] }
}

const DOCUMENTS_BY_TYPE = {
  Individual: [
    { name: "Driver's License (Taxpayer & Spouse)", hint: "PDF or image file", icon: Badge, color: "#3B82F6" }, 
    { name: "Prior Tax Returns", hint: "PDF or image file", icon: Award, color: "#10B981" }, 
    { name: "Any source Documents", hint: "PDF or image file", icon: FileText, color: "#9CA3AF" },
  ],
  business: [
    { name: "Prior Tax Returns", hint: "PDF or image file", icon: Award, color: "#10B981" },
    { name: "Any source Documents", hint: "PDF or image file", icon: FileText, color: "#9CA3AF" },
  ],
}

const MAX_FILE_SIZE = 200 * 1024 * 1024
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
]
const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".xlsx", ".xls", ".csv"]

const UploadDocumentsStep: React.FC<UploadDocumentsStepProps> = ({ onClose, accounts = [] }) => {
  const [currentAccountIndex, setCurrentAccountIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [uploadedAccounts, setUploadedAccounts] = useState<string[]>([])
  const [dragOverCategory, setDragOverCategory] = useState<string | null>(null)
  const [fileQueue, setFileQueue] = useState<AccountFileQueue>({})
  const [generalValidationError, setGeneralValidationError] = useState<string | null>(null)

  const colors = {
    primary: "#5A6863",
    primaryForeground: "#FFFFFF",
    secondary: "#929C87",
    accent: "#F5F5F5",
    background: "#FFFFFF",
    foreground: "#000000",
    border: "#B8B8B8",
    muted: "#F5F5F5",
    mutedForeground: "#535353",
    error: "#EF4444",
    success: "#10B981",
  }

  const currentAccount = accounts[currentAccountIndex]
  const isCurrentAccountUploaded = uploadedAccounts.includes(currentAccount?.id)
  const progressPercentage = uploadedAccounts.length > 0 ? (uploadedAccounts.length / accounts.length) * 100 : 0
  const accountFileQueue = fileQueue[currentAccount?.id] || {}

  useEffect(() => {
    if (accounts.length > 0 && !currentAccount) setCurrentAccountIndex(0)
  }, [accounts, currentAccount])

  const getRequiredDocuments = () => {
    const accountType = currentAccount?.accountType === "Individual" ? "Individual" : "business"
    return DOCUMENTS_BY_TYPE[accountType]
  }

  const validateFile = (file: File): string | undefined => {
    if (file.size === 0) return "File is empty"
    if (file.size > MAX_FILE_SIZE) return `File exceeds 200MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)`
    if (!ALLOWED_FILE_TYPES.includes(file.type)) return "Invalid file type. Only PDF, Excel, CSV, and images allowed"
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) return `Invalid extension: ${ext}`
    return undefined
  }

  const handleFiles = (files: FileList | null, docName?: string) => {
    if (!files) return
    const targetCategory = docName || "Uncategorized"
    const newFiles: { file: File; error?: string }[] = Array.from(files).map((file) => ({ file, error: validateFile(file) }))

    setFileQueue((prev) => ({
      ...prev,
      [currentAccount!.id]: {
        ...accountFileQueue,
        [targetCategory]: [...(accountFileQueue[targetCategory] || []), ...newFiles],
      },
    }))
    setGeneralValidationError(null)
  }

  const handleDrop = (e: React.DragEvent, docName: string) => {
    e.preventDefault()
    e.stopPropagation()
    handleFiles(e.dataTransfer.files, docName)
    setDragOverCategory(null)
  }

  const handleRemoveFile = (docName: string, fileIndex: number) => {
    setFileQueue((prev) => ({
      ...prev,
      [currentAccount.id]: {
        ...accountFileQueue,
        [docName]: accountFileQueue[docName].filter((_, i) => i !== fileIndex),
      },
    }))
  }

  const canNavigateToNext = () => {
    const totalFiles = Object.values(accountFileQueue).reduce((sum, files) => sum + files.length, 0)
    return isCurrentAccountUploaded || totalFiles === 0
  }

  const canNavigateToPrev = () =>
    currentAccountIndex > 0 &&
    (isCurrentAccountUploaded || Object.values(accountFileQueue).reduce((sum, files) => sum + files.length, 0) === 0)

  const requiredDocuments = getRequiredDocuments()

  const handleUpload = async () => {
    try {
      setError(null)
      setUploadProgress(0)
      if (!currentAccount) return setGeneralValidationError("No account selected")
      const categoriesWithFiles = requiredDocuments.filter((doc) => (accountFileQueue[doc.name] || []).length > 0).length
      if (categoriesWithFiles < requiredDocuments.length)
        return setGeneralValidationError(`Please upload files for all ${requiredDocuments.length} required Documents`)
      if (accountFileQueue[currentAccount.id]) {
        const hasErrors = Object.values(accountFileQueue[currentAccount.id])
          .flat()
          .some((f) => f.error)
        if (hasErrors) return setGeneralValidationError("Fix file errors before uploading")
      }
      if (isCurrentAccountUploaded) return setGeneralValidationError("Documents already uploaded")

      setLoading(true)
      setUploadProgress(10)

      const formData = new FormData()
      Object.values(accountFileQueue).forEach((filesArr) => {
        filesArr.forEach((f) => {
          if (!f.error) formData.append("files", f.file)
        })
      })
      formData.append("type", "prospect_documents")
      formData.append("accountName", currentAccount.name)
      setUploadProgress(30)

      const token = localStorage.getItem("accessToken")
      if (!token) {
        setGeneralValidationError("Missing access token")
        setLoading(false)
        return
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zoho/prospect/upload/files`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      setUploadProgress(80)
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Upload failed")

      setUploadProgress(100)
      setSuccessMessage(`Documents for ${currentAccount.name} uploaded successfully!`)
      setUploadedAccounts((prev) => [...prev, currentAccount.id])
      setLoading(false)

      setTimeout(() => {
        if (currentAccountIndex < accounts.length - 1) {
          setCurrentAccountIndex(currentAccountIndex + 1)
          setSuccessMessage(null)
          setUploadProgress(0)
        }
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Upload failed")
      setLoading(false)
      setUploadProgress(0)
    }
  }

  const handleNextAccount = () => {
    if (!canNavigateToNext()) return setGeneralValidationError("Upload documents before moving forward")
    if (currentAccountIndex < accounts.length - 1) {
      setCurrentAccountIndex(currentAccountIndex + 1)
      setGeneralValidationError(null)
    }
  }

  const handlePrevAccount = () => {
    if (!canNavigateToPrev()) return setGeneralValidationError("Upload documents before going back")
    if (currentAccountIndex > 0) {
      setCurrentAccountIndex(currentAccountIndex - 1)
      setGeneralValidationError(null)
    }
  }

  if (!currentAccount)
    return (
      <div className="w-full rounded-2xl">
        <div className="px-6 py-8 text-center bg-background">
          <p className="text-sm text-muted-foreground">No accounts available</p>
        </div>
      </div>
    )

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg">
      {/* HEADER */}
      <div className="px-6 py-5 flex items-center justify-between" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${colors.secondary}40` }}>
            <ShieldCheck className="w-5 h-5" style={{ color: colors.primaryForeground }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Upload Documents</h2>
            <p className="text-xs mt-0.5 opacity-70">{uploadedAccounts.length} of {accounts.length} accounts completed</p>
          </div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="h-2" style={{ backgroundColor: colors.border }}>
        <div className="h-full transition-all duration-300" style={{ width: `${progressPercentage}%`, backgroundColor: colors.secondary }} />
      </div>

      {/* UPLOAD PROGRESS */}
      {loading && uploadProgress > 0 && (
        <div className="px-6 py-4 space-y-2" style={{ backgroundColor: colors.accent }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold" style={{ color: colors.foreground }}>Uploading documents...</p>
            <span className="text-xs font-bold" style={{ color: colors.primary }}>{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${colors.border}40` }}>
            <div className="h-full transition-all duration-300" style={{ width: `${uploadProgress}%`, backgroundColor: colors.secondary }} />
          </div>
        </div>
      )}

      <div className="px-6 py-6 space-y-5 max-h-[85vh] overflow-y-auto" style={{ backgroundColor: colors.background }}>
        {/* NAVIGATION */}
        <div className="flex items-center justify-between rounded-lg p-4" style={{ backgroundColor: colors.accent }}>
          <button onClick={handlePrevAccount} disabled={currentAccountIndex === 0 || !canNavigateToPrev()} className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all disabled:opacity-40" style={{ color: colors.primary }}>
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <div className="text-center">
            <p className="text-sm font-bold" style={{ color: colors.primary }}>{currentAccount.name}</p>
            <p className="text-xs mt-1" style={{ color: colors.mutedForeground }}>Step {currentAccountIndex + 1} of {accounts.length}</p>
          </div>

          <button onClick={handleNextAccount} disabled={currentAccountIndex === accounts.length - 1 || !canNavigateToNext()} className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all disabled:opacity-40" style={{ color: colors.primary }}>
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* ERRORS & SUCCESS */}
        {generalValidationError && <div className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}><AlertCircle className="w-4 h-4" style={{ color: colors.error }} /><p className="text-xs font-semibold" style={{ color: colors.error }}>{generalValidationError}</p></div>}
        {error && <div className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}><AlertCircle className="w-4 h-4" style={{ color: colors.error }} /><p className="text-xs font-semibold" style={{ color: colors.error }}>{error}</p></div>}
        {successMessage && <div className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}><CheckCircle className="w-5 h-5" style={{ color: colors.success }} /><p className="text-xs font-semibold" style={{ color: colors.success }}>{successMessage}</p></div>}

        {/* DOCUMENT CATEGORIES */}
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${requiredDocuments.length}, minmax(0, 1fr))` }}>
          {requiredDocuments.map((doc, docIdx) => {
            const Icon = doc.icon
            const categoryFiles = accountFileQueue[doc.name] || []

            return (
              <div key={docIdx} className="space-y-2">
                <div className="rounded-xl p-4 border-2 transition-all min-h-64 flex flex-col" style={{ backgroundColor: dragOverCategory === doc.name ? `${doc.color}10` : "transparent", borderColor: dragOverCategory === doc.name ? doc.color : `${colors.border}40` }} onDragOver={(e) => { e.preventDefault(); setDragOverCategory(doc.name) }} onDragLeave={() => setDragOverCategory(null)} onDrop={(e) => handleDrop(e, doc.name)}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: dragOverCategory === doc.name ? `${doc.color}20` : "transparent" }}><Icon className="w-4 h-4" style={{ color: doc.color }} /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs truncate" style={{ color: colors.foreground }}>{doc.name}</p>
                      <p className="text-xs" style={{ color: colors.mutedForeground }}>{doc.hint}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-bold flex-shrink-0" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>{categoryFiles.length}</span>
                  </div>

                  {/* Files List */}
                  <div className="flex-1 space-y-2 mb-3 max-h-40 overflow-y-auto" style={{ scrollBehavior: "smooth" }}>
                    {categoryFiles.map((f, fileIdx) => {
                      const file = f.file
                      const isError = f.error
                      return (
                        <div key={fileIdx} className="rounded-lg px-2 py-1.5 flex items-center justify-between" style={{ backgroundColor: isError ? "#FEE2E2" : "rgba(16, 185, 129, 0.1)" }}>
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <FileCheck className="h-3 w-3 flex-shrink-0" style={{ color: isError ? colors.error : colors.success }} />
                            <div className="flex-1 min-w-0">
                              <span className="text-xs truncate block" style={{ color: isError ? colors.error : colors.foreground, fontWeight: isError ? "600" : "400" }}>{file.name}</span>
                              {isError && <span className="text-xs block" style={{ color: colors.error, fontWeight: "600" }}>{f.error}</span>}
                            </div>
                          </div>
                          <button onClick={() => handleRemoveFile(doc.name, fileIdx)} className="ml-2 p-1 rounded hover:bg-opacity-80 transition-all flex-shrink-0" style={{ color: colors.error }}>
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  {/* Drop Zone */}
                  <label htmlFor={`file-input-${docIdx}`} className="flex flex-col items-center justify-center p-3 border-2 border-dashed rounded-xl cursor-pointer transition-all" style={{ borderColor: dragOverCategory === doc.name ? doc.color : `${colors.border}40`, backgroundColor: dragOverCategory === doc.name ? `${doc.color}10` : "transparent" }}>
                    <input type="file" id={`file-input-${docIdx}`} className="hidden" multiple onChange={(e) => handleFiles(e.target.files, doc.name)} />
                    <Upload className="w-5 h-5 mb-2" style={{ color: colors.primary }} />
                    <span className="text-xs font-semibold" style={{ color: colors.mutedForeground }}>Drag & drop or browse</span>
                  </label>
                </div>
              </div>
            )
          })}
        </div>

     
        {uploadedAccounts.length === accounts.length ? (
          <button onClick={onClose} disabled={loading} className="w-full py-3 mt-3 rounded-lg font-semibold text-sm transition-all" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
            Close
          </button>
        ) : (<button onClick={handleUpload} disabled={loading} className="w-full py-3 mt-3 rounded-lg font-semibold text-sm transition-all" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
          {loading ? "Uploading..." : "Upload Documents"}
        </button>)

        }
      </div>
    </div>
  )
}

export default UploadDocumentsStep
