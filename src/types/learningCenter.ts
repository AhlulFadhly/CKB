export type DocumentType = 'FORM' | 'SOP' | 'WI' | 'JOBAID' | 'POLICY' | 'MANUAL';

export interface LearningDocument {
  id: string;
  docNumber: string;
  title: string;
  company: 'CKB' | 'ATR' | 'ABM';
  division: string;
  docType: DocumentType;
  revision: string;
  lastUpdated: string;
  isConfidential: boolean;
  fileSize?: string;
  fileUrl?: string;
  downloadCount?: number;
  uploadedBy?: string;
}

export interface DocumentFilterState {
  company: string;
  docType: string;
  division: string;
  searchQuery: string;
}

export interface DocumentFormData {
  id?: string;
  docNumber: string;
  title: string;
  docType: DocumentType;
  companyDivision: string;
  company: 'CKB' | 'ATR' | 'ABM';
  revision: string;
  lastUpdated: string;
  file?: File | null;
  fileName?: string;
  fileSize?: string;
}
