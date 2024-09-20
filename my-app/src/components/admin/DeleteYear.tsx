import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText } from "@mui/material";

function DeleteYear({ open, handleClose }: any) {
    const [yearsList, setYearsList] = useState<any[]>([]);
    const [selectedYearToDelete, setSelectedYearToDelete] = useState("");
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  
    useEffect(() => {
      const fetchYears = async () => {
        try {
          const response = await axios.get('https://localhost:5001/api/Year');
          setYearsList(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchYears();
    }, []);
  
    const handleSelectYear = (yearId: any) => {
      setSelectedYearToDelete(yearId);
    };
  
    const handleDeleteYear = async (yearId: any) => {
      try {
        await axios.delete(`https://localhost:5001/api/Year/${yearId}`);
        // Handle success, e.g., show a success message or update the state
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message or handle the error state
      }
    };
  
    const handleConfirmDelete = () => {
      setConfirmDialogOpen(true);
    };
  
    const handleCancelDelete = () => {
      setConfirmDialogOpen(false);
    };
  
    const handleConfirmDeleteYear = () => {
      handleDeleteYear(selectedYearToDelete);
      handleClose();
      setConfirmDialogOpen(false);
      window.location.reload()
    };
  
    return (
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Select Year to Delete</DialogTitle>
          <DialogContent>
            <List>
              {yearsList.map((year) => (
                <ListItem
                  key={year.id}
                  button
                  onClick={() => handleSelectYear(year.id)}
                  selected={selectedYearToDelete === year.id}
                >
                  <ListItemText primary={year.graduatedSchoolYear} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirmDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
  
        <Dialog open={confirmDialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Year Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this year?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirmDeleteYear} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

export default DeleteYear;
