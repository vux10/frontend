import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

import { clearNotification } from "../redux/slide/notificationSlice";

export default function Notification () {
  const { message, type, visible } = useSelector((state) => state.notification)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setOpen(true)
    setTimeout(() => {
      dispatch(clearNotification())
      setOpen(false)
    }, 2000)
  }, [dispatch, message, type, visible])

  return (
    visible && 
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
      >
        <Alert
          variant='filled'
          onClose={() => setOpen(false)}
          severity={type ?? 'error'}
        >
          {message}
        </Alert>
      </Snackbar>
  )
}
