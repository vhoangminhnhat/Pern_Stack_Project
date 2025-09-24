export interface ITeacherManagementAction {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  teacherId?: string;
  isEdit?: boolean;
}
