import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const CrudTable = ({ tableName }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [tableName]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/${tableName}`);
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Fetched data is not an array:", result);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleAdd = () => {
    setFormData({});
    setEditing(false);
    setOpen(true);
  };

  const handleEdit = (row) => {
    setFormData(row);
    setEditId(row.id);
    setEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/${tableName}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchData();
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editing) {
        await fetch(`/api/${tableName}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: editId, updatedData: formData }),
        });
      } else {
        await fetch(`/api/${tableName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newData: formData }),
        });
      }
      setOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Yeni Ekle
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              <TableCell>Aksiyonlar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {Object.values(row).map((val, index) => (
                  <TableCell key={`${row.id}-${index}`}>{val}</TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEdit(row)}
                  >
                    Güncelle
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    Sil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editing ? "Güncelle" : "Yeni Kayıt"}</DialogTitle>
        <DialogContent>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => (
              <TextField
                key={key}
                margin="dense"
                name={key}
                label={key}
                type="text"
                fullWidth
                value={formData[key] || ""}
                onChange={handleChange}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            İptal
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CrudTable;
