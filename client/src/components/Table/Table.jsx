import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Container } from '@mui/material';
import { toast } from 'react-toastify';


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };
}

const Table = () => {
    const [rowModesModel, setRowModesModel] = useState({});
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        (async function () {
            try {
                const { data } = await axios.get('/getStudents');
                console.log(data);
                setRows(data.users);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh]);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    // Inside your Tables component

    const handleSaveClick = async (id) => {
        try {
            const editedRow = rows.find((row) => row._id === id);
            console.log(editedRow);
            const { data } = await axios.put(`/update/${id}`, editedRow);
            if (data.success) {
                setRows((prevRows) =>
                    prevRows.map((row) => (row._id === id ? editedRow : row))
                );
                setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

                toast.success(data.message, {
                    position: "top-center"
                });
            } else {
                toast.error(data.message, {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteClick = async (_id) => {
        try {
            const { data } = await axios.delete(`/delete/${_id}`)
            if (data.success) {
                toast.success(data.message, {
                    position: "top-center"
                })
                setRefresh(!refresh)
            } else {
                toast.error(data.message, {
                    position: "top-center"
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row._id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row._id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'name', headerName: 'Full Name', width: 160, editable: true },
        { field: 'phone', headerName: 'Phone', width: 130, editable: true },
        { field: 'email', headerName: 'Email', width: 200, editable: true },
        { field: 'batch', headerName: 'Batch', width: 120, editable: true },
        { field: 'domain', headerName: 'Domain', width: 120, editable: true },
        { field: 'place', headerName: 'Place', width: 120, editable: true },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 120,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key={1}
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={() => handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key={2}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        key={1}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={2}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Container component="main" maxWidth="lg" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: "100vh"
        }} >
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                    alignItems:'center'
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    getRowId={(row) => row._id}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Box>
        </Container>
    );
}


export default Table