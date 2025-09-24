export interface IScheduleManagementAction {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  scheduleId?: string;
  isEdit?: boolean;
}
