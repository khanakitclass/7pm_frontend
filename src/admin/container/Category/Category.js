import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { array, date, mixed, number, object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../../redux/slice/category.slice';
import { IMAGE_URL } from '../../../utils/baseURL';

function Category(props) {
    const [open, setOpen] = React.useState(false);
    const [catData, setCatData] = useState([]);
    const [update, setUpdate] = useState(false);

    const c = useSelector(state => state.count);

    const category = useSelector(state => state.category);
    console.log(category);
    

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteCategory(id));

    }

    const handleEdit = (data) => {
        console.log(data);
        setValues(data)
        handleClickOpen();
        setUpdate(true);
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'cat_img', headerName: 'Image', width: 130, 
            renderCell: (params) => {
                return (
                    <img src={IMAGE_URL + params.row.cat_img} width={"50px"} height={"50px"} />
                )
            }
        },
        {
            headerName: 'Action',
            width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];

    const getData = () => {
        dispatch(getCategories());
    }

    useEffect(() => {
        getData();
    }, [])

    const paginationModel = { page: 0, pageSize: 5 };

    const categorySchema = object({
        name: string()
            .required("Please enter category name.")
            .matches(/^[a-zA-Z ]+$/, "Only character and space allowed.")
            .min(2, "Minimum 2 character need in category name.")
            .max(30, 'Maximum 30 character allowed.'),
        cat_img: mixed()
            .required()
            .test("fileSize", "The file is too large", (value) => {
                console.log(value);
                
                return value && value.size <= 2000000;
            })
            .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc", (value) => {
                return value && (
                    value.type === "image/jpeg" ||
                    value.type === "image/png"
                );
            }),
        description: string().required()
    });

    const addCategory = (values) => {
        dispatch(createCategory(values));
    }

    const updateCategoryData = (data) => {
        dispatch(updateCategory(data))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            cat_img: ''
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                updateCategoryData(values);
            } else {
                addCategory(values)
            }

            resetForm();
            handleClose();

        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetForm();
        setUpdate(false);
    };

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm, setFieldValue } = formik;

    console.log(errors, touched);

    return (
        <React.Fragment>
            <h1>Category {c.count}</h1>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <DialogTitle>Category</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="name"
                            type="name"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />
                        
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="description"
                            type="description"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={errors.description && touched.description}
                            helperText={errors.description && touched.description ? errors.description : ''}
                        />
                        
                        <input 
                            type='file'
                            name='cat_img'
                            onChange={(e) => setFieldValue("cat_img", e.target.files[0])}
                        />
                        <img name="cat_img_photo" src={
                            typeof values?.cat_img === 'string' ? IMAGE_URL + values?.cat_img : 
                            typeof values?.cat_img === 'object' ? URL.createObjectURL(values?.cat_img) : null
                            } width="100px" height={"100px"} />
                        {errors.cat_img && touched.cat_img ? <p>{errors.cat_img}</p> : null}
                        <br></br><br></br>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{update ? 'Update' : 'Submit'}</Button>
                    </DialogActions>
                </form>

            </Dialog>

            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={category.categories}
                    getRowId={(row) => row._id}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                    disableColumnResize={false}
                />
            </Paper>
        </React.Fragment>
    );
}

export default Category;


// import React, { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { array, date, mixed, number, object, string } from 'yup';
// import { useFormik } from 'formik';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { useSelector } from 'react-redux';
// import { FormHelperText, MenuItem, Select } from '@mui/material';

// function Category(props) {
//     const [open, setOpen] = React.useState(false);
//     const [catData, setCatData] = useState([]);
//     const [update, setUpdate] = useState(false);

//     const c = useSelector(state => state.count)

//     const handleDelete = (id) => {
        
        
//         const localData = JSON.parse(localStorage.getItem("category"));

//         console.log(localData, id);

//         // const index = localData.findIndex((v) => v.id === id);

//         // console.log(index);

//         // localData.splice(index, 1);

//         const fData = localData.filter((v) => v.id !== id);

//         console.log(fData);
        
//         localStorage.setItem("category", JSON.stringify(fData));

//         setCatData(fData)

//     }

//     const handleEdit = (data) => {
//         console.log(data);
//         setValues(data)
//         handleClickOpen();
//         setUpdate(true);
//     }

//     const columns = [
//         { field: 'name', headerName: 'Name', width: 70 },
//         { field: 'description', headerName: 'Description', width: 130 },
//         {
//             headerName: 'Action',
//             width: 130,
//             renderCell: (params) => {
//                 return (
//                     <>
//                         <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
//                             <EditIcon />
//                         </IconButton>
//                         <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
//                             <DeleteIcon />
//                         </IconButton>
//                     </>
//                 )
//             }
//         }
//     ];

//     const getData = () => {
//         const localData = JSON.parse(localStorage.getItem("category"));

//         setCatData(localData);
//     }

//     useEffect(() => {
//         getData();
//     }, [])

//     const paginationModel = { page: 0, pageSize: 5 };

//     const categorySchema = object({
//         name: string()
//             .required("Please enter category name.")
//             .matches(/^[a-zA-Z ]+$/, "Only character and space allowed.")
//             .min(2, "Minimum 2 character need in category name.")
//             .max(30, 'Maximum 30 character allowed.'),
//         age: number()
//             .required()
//             .typeError("Only number allowed.")
//             .integer()
//             .min(1),
//         address: string()
//             .required()
//             .test("address", "Maximum 3 word allowed.", (value) => {
//                 let str = value.trim().split(" ").length;

//                 console.log(value, str);

//                 if (str > 3) {
//                     return false
//                 } else {
//                     return true
//                 }
                
                
//             }),
//         bod: date()
//             .required()
//             .max(new Date(), "Max today or past date allowed."),
//         cat_img: mixed()
//             .required()
//             .test("fileSize", "The file is too large", (value) => {
//                 console.log(value);
                
//                 return value && value.size <= 2000000;
//             })
//             .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc", (value) => {
//                 return value && (
//                     value.type === "image/jpeg" ||
//                     value.type === "image/png"
//                 );
//             }),
//         description: string().required(),
//         country: string()
//             .required(),
//         gender:  string()
//             .required(),
//         hobby: array()
//             .required()
//             .min(2)
//             // .test("hobby", "sdc", (value) => {
//             //     console.log(value);
                
//             // })
//             // .min(2).of(string().required()).required(),
//     });

//     const addCategory = (values) => {
//         const localData = JSON.parse(localStorage.getItem("category"));

//         console.log(localData, values);


//         if (localData) {
//             localData.push({ ...values, id: Math.floor(Math.random() * 10000) });
//             localStorage.setItem("category", JSON.stringify(localData));
//             setCatData(localData)
//         } else {
//             localStorage.setItem("category", JSON.stringify([{ ...values, id: Math.floor(Math.random() * 10000) }]));
//             setCatData([{ ...values, id: Math.floor(Math.random() * 10000) }])
//         }

//     }

//     const updateCategoryData = (data) => {
//         const localData = JSON.parse(localStorage.getItem("category"));

//         console.log(localData, data);
        
//         const index = localData.findIndex((v) => v.id === data.id);

//         console.log(index);

//         localData[index] = data;

//         console.log(localData);
        
//         localStorage.setItem("category", JSON.stringify(localData));

//         setCatData(localData);
//     }

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             age: '',
//             address: '',
//             bod: '',
//             description: '',
//             cat_img: '',
//             country: '',
//             gender: '',
//             hobby: []
//         },
//         validationSchema: categorySchema,
//         onSubmit: (values, { resetForm }) => {

//             if (update) {
//                 updateCategoryData(values);
//             } else {
//                 addCategory(values)
//             }
            

//             resetForm();
//             handleClose();

//         },
//     });

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         resetForm();
//         setUpdate(false);
//     };

//     const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues, resetForm, setFieldValue } = formik;

//     console.log(errors, touched);

//     return (
//         <React.Fragment>
//             <h1>Category {c.count}</h1>
//             <Button variant="outlined" onClick={handleClickOpen}>
//                 Add Category
//             </Button>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//             >
//                 <form onSubmit={handleSubmit}>
//                     <DialogTitle>Category</DialogTitle>
//                     <DialogContent>
//                         <TextField
//                             margin="dense"
//                             id="name"
//                             name="name"
//                             label="name"
//                             type="name"
//                             fullWidth
//                             variant="standard"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.name}
//                             error={errors.name && touched.name}
//                             helperText={errors.name && touched.name ? errors.name : ''}
//                         />
//                         <TextField
//                             margin="dense"
//                             id="name"
//                             name="age"
//                             label="age"
//                             type="age"
//                             fullWidth
//                             variant="standard"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.age}
//                             error={errors.age && touched.age}
//                             helperText={errors.age && touched.age ? errors.age : ''}
//                         />
//                         <TextField
//                             margin="dense"
//                             id="name"
//                             name="address"
//                             label="address"
//                             type="address"
//                             fullWidth
//                             variant="standard"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.address}
//                             error={errors.address && touched.address}
//                             helperText={errors.address && touched.address ? errors.address : ''}
//                         />
//                         <TextField
//                             margin="dense"
//                             id="description"
//                             name="description"
//                             label="description"
//                             type="description"
//                             fullWidth
//                             variant="standard"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.description}
//                             error={errors.description && touched.description}
//                             helperText={errors.description && touched.description ? errors.description : ''}
//                         />
//                         <TextField
//                             margin="dense"
//                             id="bod"
//                             name="bod"
//                             label="bod"
//                             type="date"
//                             fullWidth
//                             variant="standard"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             value={values.bod}
//                             error={errors.bod && touched.bod}
//                             helperText={errors.bod && touched.bod ? errors.bod : ''}
//                         />
//                         <input 
//                             type='file'
//                             name='cat_img'
//                             onChange={(e) => setFieldValue("cat_img", e.target.files[0])}
//                         />
//                         <img name="cat_img_photo" src="" width="100px" height={"100px"} />
//                         {errors.cat_img && touched.cat_img ? <p>{errors.cat_img}</p> : null}
//                         <br></br><br></br>
//                         <Select
//                             variant="standard"
//                             labelId="demo-simple-select-standard-label"
//                             id="demo-simple-select-standard"
//                             value={values.country}
//                             onChange={handleChange}
//                             label="country"
//                             name="country"
//                             onBlur={handleBlur}
//                             error={errors.country && touched.country}
//                         >
//                             <MenuItem value={""}>--Select Country--</MenuItem>
//                             <MenuItem value={"in"}>India</MenuItem>
//                             <MenuItem value={"us"}>US</MenuItem>
//                             <MenuItem value={"uk"}>UK</MenuItem>
//                         </Select>
//                         <FormHelperText>{errors.country && touched.country ? errors.country : ''}</FormHelperText>

//                         <input type="radio" name='gender' value={"male"}  onChange={handleChange}
//                             onBlur={handleBlur} />
//                         <span>Male</span>
//                         <input type="radio" name='gender' value={"female"}  onChange={handleChange}
//                             onBlur={handleBlur} />
//                         <span>Female</span>
//                         {errors.gender && touched.gender ? <p>{errors.gender}</p> : null}

//                         <input type='checkbox' name='hobby' value={"cricket"} onChange={handleChange}
//                             onBlur={handleBlur}  />
//                         <span>Cricket</span>
//                         <input type='checkbox' name='hobby' value={"Music"} onChange={handleChange}
//                             onBlur={handleBlur}  />
//                         <span>Music</span>
//                         <input type='checkbox' name='hobby' value={"Travelling"} onChange={handleChange}
//                             onBlur={handleBlur}  />
//                         <span>Travelling</span>
//                         <input type='checkbox' name='hobby' value={"Reading"} onChange={handleChange}
//                             onBlur={handleBlur}  />
//                         <span>Reading</span>
//                         {errors.hobby && touched.hobby ? <p>{errors.hobby}</p> : null}
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose}>Cancel</Button>
//                         <Button type="submit">{update ? 'Update' : 'Submit'}</Button>
//                     </DialogActions>
//                 </form>

//             </Dialog>

//             <Paper sx={{ height: 400, width: '100%' }}>
//                 <DataGrid
//                     rows={catData}
//                     columns={columns}
//                     initialState={{ pagination: { paginationModel } }}
//                     pageSizeOptions={[5, 10]}
//                     checkboxSelection
//                     sx={{ border: 0 }}
//                     disableColumnResize={false}
//                 />
//             </Paper>
//         </React.Fragment>
//     );
// }

// export default Category;