import { Dialog, DialogContent } from '@/components/ui/dialog';

const WrapperModalDetailPost = ({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full h-full max-w-[95vw] max-h-[95vh] overflow-auto">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default WrapperModalDetailPost;
