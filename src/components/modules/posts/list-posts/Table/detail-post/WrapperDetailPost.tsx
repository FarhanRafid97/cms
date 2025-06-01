import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
      <DialogContent className="w-screen max-w-screen-xl h-screen max-h-[90%]">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default WrapperModalDetailPost;
