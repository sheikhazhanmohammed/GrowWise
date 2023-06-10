import ProductList from '../ProductList.jsx'

function ProductType({producttypedata}) {
    console.log("these are product types",producttypedata)

  return (
    producttypedata.map((typeOfProduct,index)=>(
        <ProductList productList={typeOfProduct} key={index}/>
    ))
    
  )
}

export default ProductType