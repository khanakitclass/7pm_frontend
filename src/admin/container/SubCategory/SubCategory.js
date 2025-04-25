import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { number, object, string } from 'yup';
import { useFormik } from 'formik';
import { FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCategory, deleteSubCategory, getSubCategory, updateSubCategory } from '../../../redux/slice/subcategory.slice';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function SubCategory(props) {
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const [catData, setCatData] = useState([]);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    const subcat = useSelector(state => state.subcategory);

    console.log(subcat);


    const getCategory = () => {
        const localData = JSON.parse(localStorage.getItem("category"));

        setCatData(localData);
    }

    const getSubCategoryData = () => {
        dispatch(getSubCategory());
    }

    useEffect(() => {
        getCategory();
        getSubCategoryData();
    }, [])

    const handleChangeCat = (event) => {
        setCategory(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        resetForm();
    };

    let subcatSchema = object({
        category: number().required(),
        name: string().required(),
        description: string().required()
    });

    const handleAddSubCat = (values) => {
        dispatch(addSubCategory(values))
    }

    const formik = useFormik({
        initialValues: {
            category: '',
            name: '',
            description: '',
        },
        validationSchema: subcatSchema,
        onSubmit: values => {
            if (update) {
                dispatch(updateSubCategory(values));
            } else {
                handleAddSubCat({ ...values, id: Math.floor(Math.random() * 1000) });
            }

            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm } = formik;

    const handleDelete = (id) => {
        console.log(id);
        dispatch(deleteSubCategory(id));
    }

    const handleEdit = (data) => {
        setValues(data);
        handleClickOpen();
        setUpdate(true);
    }

    const columns = [
        { 
            field: 'category', 
            headerName: 'Category', 
            width: 130,
            renderCell: (params) => {
                
                const cName = catData?.find((v) => v.id === params.row.category)?.name;

                return cName;
                
            }
        },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            headerName: 'Actions',
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];
    const paginationModel = { page: 0, pageSize: 5 };


    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add SubCategory
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>SubCategory</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={values.category}
                            onChange={handleChange}
                            label="Category"
                            name="category"
                            onBlur={handleBlur}
                            error={errors.category && touched.category}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                catData?.map((v) => (
                                    <MenuItem value={v.id}>{v.name}</MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>{errors.category && touched.category ? errors.category : ''}</FormHelperText>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name && touched.name}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            value={values.description}
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.description && touched.description}
                            helperText={errors.description && touched.description ? errors.description : ''}
                        />

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Submit'}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>

            </Dialog>

            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={subcat.subcategory}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </React.Fragment>
    );
}

export default SubCategory;