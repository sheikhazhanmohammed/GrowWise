import ProductType from '../ProductType'

function CropOutput(cropData) {
  console.log("this is crop data",cropData.cropData)
  return (
    cropData.cropData.IMList.map(ProductTypeData=>(
      <>
      <ProductType producttypedata={ProductTypeData}/>
      </>
    )
  ))
}

export default CropOutput