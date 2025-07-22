'use client';

import { useEffect, useState } from 'react';
import {
  formatBytes,
  useFileUpload,
  type FileMetadata,
  type FileWithPreview,
} from '@/hooks/use-file-upload';
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Download,
  FileArchiveIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  RefreshCwIcon,
  Trash2,
  TriangleAlert,
  Upload,
  VideoIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FileUploadItem extends FileWithPreview {
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}
interface TableUploadProps {
  maxFiles?: number;
  maxSize?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  onFilesChange?: (files: FileWithPreview[]) => void;
  simulateUpload?: boolean;
}


export default function CarsImportForm({
  maxFiles = 1,
  maxSize = 50 * 1024 * 1024, 
  accept = '*',
  multiple = true,
  className,
  onFilesChange,
  simulateUpload = true,
}: TableUploadProps) {

 
  const [uploadFiles, setUploadFiles] = useState<FileUploadItem[]>([]);
  const [
    { isDragging, errors },
    {
      removeFile,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple,
    onFilesChange: (newFiles) => {
      const newUploadFiles = newFiles.map((file) => {
        const existingFile = uploadFiles.find((existing) => existing.id === file.id);
        if (existingFile) {
          return {
            ...existingFile,
            ...file,
          };
        } else {
          return {
            ...file,
            progress: 0,
            status: 'uploading' as const,
          };
        }
      });
      setUploadFiles(newUploadFiles);
      onFilesChange?.(newFiles);
    },
  });
  
  useEffect(() => {
    if (!simulateUpload) return;
    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((file) => {
          if (file.status !== 'uploading') return file;
          const increment = Math.random() * 15 + 5; 
          const newProgress = Math.min(file.progress + increment, 100);
          if (newProgress >= 100) {
            const shouldFail = Math.random() < 0.1;
            return {
              ...file,
              progress: 100,
              status: shouldFail ? ('error' as const) : ('completed' as const),
              error: shouldFail ? 'Upload failed. Please try again.' : undefined,
            };
          }
          return { ...file, progress: newProgress };
        }),
      );
    }, 500);
    return () => clearInterval(interval);
  }, [simulateUpload]);
  const removeUploadFile = (fileId: string) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== fileId));
    removeFile(fileId);
  };
  const retryUpload = (fileId: string) => {
    setUploadFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, progress: 0, status: 'uploading' as const, error: undefined } : file,
      ),
    );
  };
  const getFileIcon = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type;
    if (type.startsWith('image/')) return <ImageIcon className="size-4" />;
    if (type.startsWith('video/')) return <VideoIcon className="size-4" />;
    if (type.startsWith('audio/')) return <HeadphonesIcon className="size-4" />;
    if (type.includes('pdf')) return <FileTextIcon className="size-4" />;
    if (type.includes('word') || type.includes('doc')) return <FileTextIcon className="size-4" />;
    if (type.includes('excel') || type.includes('sheet')) return <FileSpreadsheetIcon className="size-4" />;
    if (type.includes('zip') || type.includes('rar')) return <FileArchiveIcon className="size-4" />;
    return <FileTextIcon className="size-4" />;
  };
  const getFileTypeLabel = (file: File | FileMetadata) => {
    const type = file instanceof File ? file.type : file.type;
    if (type.startsWith('image/')) return 'Image';
    if (type.startsWith('video/')) return 'Video';
    if (type.startsWith('audio/')) return 'Audio';
    if (type.includes('pdf')) return 'PDF';
    if (type.includes('word') || type.includes('doc')) return 'Word';
    if (type.includes('excel') || type.includes('sheet')) return 'Excel';
    if (type.includes('zip') || type.includes('rar')) return 'Archive';
    if (type.includes('json')) return 'JSON';
    if (type.includes('text')) return 'Text';
    return 'File';
  };

    return (
        <div className="w-full h-full">
            <Fragment>
                <Card>
                    <CardContent className="p-10">
                        <div className={cn('w-full space-y-4', className)}>
                            {uploadFiles.length < maxFiles && <div
                                className={cn(
                                    'relative rounded-lg border border-dashed p-6 text-center transition-colors',
                                    isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                                )}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <input {...getInputProps()} className="sr-only" />
                                <div className="flex flex-col items-center gap-4">
                                    <div
                                        className={cn(
                                            'flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors',
                                            isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/25',
                                        )}
                                    >
                                        <Upload className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">
                                            Drop file here or{' '}
                                            <button
                                                type="button"
                                                onClick={openFileDialog}
                                                className="cursor-pointer text-primary underline-offset-4 hover:underline"
                                            >
                                                browse file
                                            </button>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Maximum file size: {formatBytes(maxSize)}
                                        </p>
                                    </div>
                                </div>
                            </div>}
                            {/* Files Table */}
                            {uploadFiles.length > 0 && (
                                <div className="space-y-4">
                                    <div className="rounded-lg border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="text-xs">
                                                    <TableHead className="h-9">Name</TableHead>
                                                    <TableHead className="h-9">Type</TableHead>
                                                    <TableHead className="h-9">Size</TableHead>
                                                    <TableHead className="h-9 w-[100px] text-end">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {uploadFiles.map((fileItem) => (
                                                    <TableRow key={fileItem.id}>
                                                        <TableCell className="py-2 ps-1.5">
                                                            <div className="flex items-center gap-1">
                                                                <div
                                                                    className={cn(
                                                                        'size-8 shrink-0 relative flex items-center justify-center text-muted-foreground/80',
                                                                    )}
                                                                >
                                                                    {fileItem.status === 'uploading' ? (
                                                                        <div className="relative">
                                                                            {/* Circular progress background */}
                                                                            <svg className="size-8 -rotate-90" viewBox="0 0 32 32">
                                                                                <circle
                                                                                    cx="16"
                                                                                    cy="16"
                                                                                    r="14"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="2"
                                                                                    className="text-muted-foreground/20"
                                                                                />
                                                                                {/* Progress circle */}
                                                                                <circle
                                                                                    cx="16"
                                                                                    cy="16"
                                                                                    r="14"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="2"
                                                                                    strokeDasharray={`${2 * Math.PI * 14}`}
                                                                                    strokeDashoffset={`${2 * Math.PI * 14 * (1 - fileItem.progress / 100)}`}
                                                                                    className="text-primary transition-all duration-300"
                                                                                    strokeLinecap="round"
                                                                                />
                                                                            </svg>
                                                                            {/* File icon in center */}
                                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                                {getFileIcon(fileItem.file)}
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="not-[]:size-8 flex items-center justify-center">
                                                                            {getFileIcon(fileItem.file)}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <p className="flex items-center gap-1 truncate text-sm font-medium">
                                                                    {fileItem.file.name}
                                                                    {fileItem.status === 'error' && (
                                                                        <Badge variant="destructive" size="sm" appearance="light">
                                                                            Error
                                                                        </Badge>
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="py-2">
                                                            <Badge variant="secondary" className="text-xs">
                                                                {getFileTypeLabel(fileItem.file)}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="py-2 text-sm text-muted-foreground">
                                                            {formatBytes(fileItem.file.size)}
                                                        </TableCell>
                                                        <TableCell className="py-2 pe-1">
                                                            <div className="flex items-center gap-1">
                                                                {fileItem.preview && (
                                                                    <Button variant="dim" size="icon" className="size-8" asChild>
                                                                        <a href={fileItem.preview} target="_blank">
                                                                            <Download className="size-3.5" />
                                                                        </a>
                                                                    </Button>
                                                                )}
                                                                {fileItem.status === 'error' ? (
                                                                    <Button
                                                                        onClick={() => retryUpload(fileItem.id)}
                                                                        variant="dim"
                                                                        size="icon"
                                                                        className="size-8 text-destructive/80 hover:text-destructive"
                                                                    >
                                                                        <RefreshCwIcon className="size-3.5" />
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        onClick={() => removeUploadFile(fileItem.id)}
                                                                        variant="dim"
                                                                        size="icon"
                                                                        className="size-8"
                                                                    >
                                                                        <Trash2 className="size-3.5" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            )}
                            {/* Error Messages */}
                            {errors.length > 0 && (
                                <Alert variant="destructive" appearance="light" className="mt-5">
                                    <AlertIcon>
                                        <TriangleAlert />
                                    </AlertIcon>
                                    <AlertContent>
                                        <AlertTitle>File upload error(s)</AlertTitle>
                                        <AlertDescription>
                                            {errors.map((error, index) => (
                                                <p key={index} className="last:mb-0">
                                                    {error}
                                                </p>
                                            ))}
                                        </AlertDescription>
                                    </AlertContent>
                                </Alert>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Fragment>
        </div>
    );
}
