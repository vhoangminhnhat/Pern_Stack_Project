export interface ISubjectManagementAction {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subjectId?: string;
  isEdit?: boolean;
}

