export type UploadPhase =
  | 'idle'
  | 'validating'
  | 'ready'
  | 'uploading'
  | 'success'
  | 'error'
  | 'canceled';

export type UploadErrorCode =
  | 'FILE_TOO_LARGE'
  | 'FILE_TYPE_NOT_ALLOWED'
  | 'READ_FAIL'
  | 'NETWORK'
  | 'CANCELED'
  | 'UNKNOWN';

export type PresignResponse = {
  uploadUrl: string;
  publicUrl: string;
  requiredHeaders?: Record<string, string>;
};

export type UploadProgress = {
  loaded: number;
  total: number;
  percent: number;
};

export type ImagePreview = {
  objectUrl: string;
  width?: number;
  height?: number;
  mime: string;
  size: number;
  filename: string;
};
