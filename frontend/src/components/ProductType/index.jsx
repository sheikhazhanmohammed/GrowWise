import { useAtom } from 'jotai'
import { IML } from '../../jotai/index.jsx'
import ProductList from '../ProductList'
import { Button, Typography } from '@mui/material'
import {  useNavigate } from "react-router-dom";

function ProductType() {
    const[currDATA]=useAtom(IML)
    let producttypedata=currDATA.IMList
    console.log("these are product types",producttypedata)
    let navigate = useNavigate();  
    return (
    <>
    <Button onClick={() => navigate(-1)}>Back</Button>
    <Typography variant='h1'>{currDATA.Crop}</Typography>
    
    {producttypedata.map((typeOfProduct,index)=>(
        <ProductList productList={typeOfProduct} key={index}/>
    ))}
    </>
  )
}

export default ProductType