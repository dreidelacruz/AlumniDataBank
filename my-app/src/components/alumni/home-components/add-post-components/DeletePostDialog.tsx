import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";

interface DeletePostDialogProps {
    open: boolean;
    postId: string | null;
    alumniData: any[];
    setAlumniData: (data: any[]) => void;
    handleCloseDialog: () => void;
  }
  
  const DeletePostDialog: React.FC<DeletePostDialogProps> = ({
    open,
    postId,
    alumniData,
    setAlumniData,
    handleCloseDialog,
  }) => {
    async function deletePost() {
      if (!postId) return;
  
      try {
        await axios.delete(`https://localhost:5001/api/JobPost/${postId}`);
        const updatedAlumniData = alumniData.filter(
          (post: any) => post.id !== postId
        );
        setAlumniData(updatedAlumniData);
      } catch (error) {
        console.error(`Error deleting post with ID ${postId}:`, error);
      }
  
      handleCloseDialog();
    }
  
    return (
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will permanently remove the post, and its not editable.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePost} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DeletePostDialog;