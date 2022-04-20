import React, { forwardRef, useEffect, useMemo, useState } from "react";
import MaterialTable from "@material-table/core";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { Html, Head } from "next/document";
import { getData, predict } from "../apiHnadler/predict";
import { updatepredict,deletecustomer } from "../apiHnadler/update";
import {useRouter} from "next/router"
import AlertDialog from "./loader/loader"
import Checkbox from '@mui/material/Checkbox';

const UserTable = () => {
  const [edit, setedit] = useState(false);
const[del,setdel]=useState(false)
  const [editdata, seteditdata] = useState([]);
  const [deldata, setdeldata] = useState([]);
const[filter,setfilter]=useState(false)

  // const [rows, setrows] = useState([]);
  const [disable, setdisable] = useState(true);
  const [predictdata, setpredict] = useState([]);
  const [rows, setrows] = useState([]);
const router=useRouter()

const updaterows=()=>{
  getData().then((data) => {
    data?.map((ele) => {
      if (!ele.clear_date) {
        ele.clear_date = null;
      }
    });
    setrows(data);
  });
}


  useEffect(() => {
    updaterows()
  }, []);

  const handleChange = (data) => {
    if (data.length) {
      setpredict(data);
      setdisable(false);
    } else {
      setpredict(data);
      setdisable(true);
    }
  };
  const predictHandler = () => {
    predictdata?.map((dict) => {
      delete dict.tableData;
      delete dict.predictedYY;
    });
    predict(predictdata).then((data) => {
      updatepredict(data).then(()=>{
      window.location.href="/";
      })
    });
  };
  const columns = useMemo(
    () => [
      { field: "business_code", title: "BUSSINESS_CODE" ,filtering:false},
      { field: "cust_number", title: "CUST_NUMBER" },
      { field: "buisness_year", title: "BUSSINESS_YEAR" },
      { field: "doc_id", title: "DOCUMENT_ID      " },
      { field: "cust_payment_terms", title: "CUST_PAYEMENT_TERMS" },
      { field: "name_customer", title: "CUSTOME_NAME" ,filtering:false},
      { field: "clear_date", title: "CLEAR_DATE" ,filtering:false},
      { field: "posting_date", title: "POSTING_DATE" ,filtering:false},
      { field: "document_create_date", title: "DOCUMENT_CREATE_DATE",filtering:false },
      { field: "document_create_date_1", title: "DOCUMENT_CREATE_DATE_1",filtering:false },
      { field: "due_in_date", title: "DUE_IN_DATE" ,filtering:false},
      { field: "invoice_currency", title: "INVOICE_CURRENCY" ,filtering:false},
      { field: "document_type", title: "DOCUMENT_TYPE",filtering:false },
      { field: "posting_id", title: "POSTING_ID" ,filtering:false},
      {
        field: "area_business",
        title: "AREA_BUSSINESS",
        lookup: { "": "Null" },
        filtering:false
      },
      { field: "total_open_amount", title: "TOTAL_OPEN_ACC" ,filtering:false},
      { field: "baseline_create_date", title: "BASELINE_CREATE_DATE" ,filtering:false},
      { field: "invoice_id", title: "INVOICE_ID" ,filtering:false},
      { field: "isOpen", title: "IS_OPEN" ,filtering:false},
      { field: "predicted", title: "PREDICTED" ,filtering:false},
    ],
    []
  );

  return (
    <div className='w-full h-[100%] relative bg-gray-600'>
      <button
        onClick={predictHandler}
        disabled={disable}
        className={`absolute p-1 top-[17%] left-[16%] ${
          disable ? "bg-gray-600" : "bg-white"
        } z-20 shadow-lg px-4 font-serif font-bold rounded-md `}>
        Predict
      </button>

      {edit?<AlertDialog rawData={editdata} setedit={setedit} del={false} updaterows={updaterows}/>:del?<AlertDialog deldata={deldata} setdel={setdel} setdeldata={setedit} updaterows={updaterows} del={true} />:null}
      <div className='w-[90%]  mx-auto'>
        <div className='flex p-5'>
          <div className='font-bold text-2xl text-white font-serif'>
            ABC PRODUCT
          </div>
          <div>
            <img src='/logo.png' alt='logo' className='h-18 w-[150px] ml-64' />
          </div>
        </div>
        <Checkbox 
        className={`absolute p-1 top-[40px] z-10 left-[8%] text-white`}
       value={filter}
       onChange={()=>setfilter(!filter)}
       color="info" />
        <MaterialTable
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                console.log("");
              }),
          }}
          actions={[
            rawdata=>({
              disabled:rawdata.length >1,
              icon:()=> <button className={`${
                rawdata.length >1? "bg-gray-600" : "bg-white"
        } z-20 shadow-lg px-4 font-serif text-[20px] font-bold rounded-md text-black `}>EDIT</button>,
              tooltip: "edit Customer",
              onClick: (e, rawData) => {
                seteditdata(rawData)
                setedit(true)
              },
            }),
            {
              icon:()=> <button className={`z-20 shadow-lg px-4 font-serif bg-white text-[20px] font-bold rounded-md text-black `}>DELETE</button>,
              tooltip: "delete Customer",
              onClick: (e, rawData) => {
                console.log(rawData)
                setdeldata(rawData)
                setdel(true)
              },
            },
        ]}
          title=''
          columns={columns}
          data={rows}
          options={{
            draggable: false,
            selection: true,
            headerStyle: {
              background: "gray",
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
              padding: "0px"
            },
            rowStyle: {
              fontSize: "10px",
              padding: "0px",
            },
            pageSize: 5,
            showTextRowsSelected: false,
            searchFieldStyle:{
             display:"flex",
             position:"relative",
             transform:"translate(-50%,0)",
            },
            filtering:filter,
            filterCellStyle:{
              fontSize:"9px"
            },
          }}
          onSelectionChange={(rows) => handleChange(rows)}
        />
      </div>
    </div>
  );
};

export default UserTable;
