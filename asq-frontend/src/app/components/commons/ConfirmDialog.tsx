import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@components/ui/dialog'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}): React.ReactElement => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">

        <DialogHeader>
          <DialogTitle className="text-[15px] font-medium text-[#0f2952]">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[13px] text-[#5a7099] mt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-[13px] text-[#5a7099] border border-[#dde4ef] rounded-lg hover:bg-[#f0f4fa] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 text-[13px] font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {confirmLabel}
          </button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog