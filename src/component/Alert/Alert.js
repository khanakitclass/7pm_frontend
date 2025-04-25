import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../redux/slice/alert.slice';

function Alert(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const alert = useSelector(state => state.alert);

  const dispatch = useDispatch();

  console.log(alert);


  useEffect(() => {
    if (alert.message != '') {
      enqueueSnackbar(alert.message, {
        variant: alert.variant,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });

      setTimeout(() => {
        dispatch(resetAlert());
      }, 2000);
    }
  }, [alert.message])

  return (
    <div>

    </div>
  );
}

export default Alert;