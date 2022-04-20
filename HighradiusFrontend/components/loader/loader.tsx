import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useForm } from "react-hook-form";
import { updatepredict } from "../../apiHnadler/update";
import { deletecustomer } from "../../apiHnadler/update";
export default function AlertDialog({
  del,
  rawData,
  setedit,
  updaterows,
  deldata,
  setdeldata,
  setdel
}) {
  const onsubmit = (data) => {
    var editdata = [];
    data["id"] = rawData[0].id;
    editdata[0] = data;
    console.log(editdata);
    updatepredict(editdata).then(() => {
      updaterows();
      setedit(false);
    });
  };
  const [open, setOpen] = React.useState(true);
  if (!del) {
    const { register, handleSubmit } = useForm({
      defaultValues: {
        invoice_currency: rawData[0]?.invoice_currency,
        cust_payment_terms: rawData[0]?.cust_payment_terms,
      },
    });
  }

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        className='flex flex-col'>
        <div className='w-[500px]'></div>
        <DialogTitle
          id='alert-dialog-title'
          className='font-semibold bg-gray-700 text-white'>
          {del ? (
            <>
              <div className='flex items-center'>
                <p>DELETE</p>
                <ReportProblemIcon className='text-yellow-400  text-lg mx-2' />
              </div>
            </>
          ) : (
            "EDIT"
          )}
        </DialogTitle>
        <DialogContent className='bg-gray-700'>
          {del ? (
            <><div>
              <p className='text-white mb-5'>Are You Sure, You Want To Delete These Rows?</p>
            </div>
            <div className='flex w-full'>
                <button
                onClick={()=>{
                  deletecustomer(deldata).then(()=>{
                    updaterows()
                    setdel(false)
                  })
                }}
                  className='p-2 pl-4 flex-1 mx-2 text-white border-red-500 border border-solid'>
                  Delete
                </button>
                <button
                  className='p-2 pl-4 flex-1 mx-2 text-white border-green-500 border border-solid'
                  onClick={() => {
                    setdel(false);
                  }}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className='flex justify-evenly e'>
                <div className="relative">
                  <label htmlFor="invoice" className="absolute text-sm font-semibold text-blue-700 left-[25px] top-[18px]">invoice_currency</label>
                  <input
                    type='text'
                    id="invoice"
                    className='p-2  pt-4 rounded-md outline-none font-bold focus:outline m-5 focus:outline-blue-600'
                    placeholder='invoice Currency'
                    {...register("invoice_currency")}
                  />
                </div >
                <div  className="relative">
                <label htmlFor="payment" className="absolute text-sm font-semibold text-blue-700 left-[25px] top-[18px]">cust_payment_terms</label>
                  <input
                    type='text'
                    id="payment"
                    className='p-2 pt-4 rounded-md font-bold outline-none focus:outline m-5 focus:outline-blue-600'
                    placeholder='Customer Payment Terms'
                    {...register("cust_payment_terms")}
                  />
                </div>
              </div>
              <div className='flex w-full'>
                <button
                  type='submit'
                  className='p-2 pl-4 flex-1 mx-2 text-white border-yellow-300 border border-solid'>
                  Edit
                </button>
                <button
                  type='button'
                  className='p-2 pl-4 flex-1 mx-2 text-white border-green-500 border border-solid'
                  onClick={() => {
                    setedit(false);
                  }}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* <DialogContentText id="alert-dialog-description" className="flex flex-col items-center">
            <CircularProgress disableShrink/>
          </DialogContentText> */}
        </DialogContent>
        <DialogActions className='bg-gray-700'></DialogActions>
      </Dialog>
    </div>
  );
}
