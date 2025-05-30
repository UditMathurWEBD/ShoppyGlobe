import { useEffect, useState } from "react"
import ProductItem from "./ProductItem"
import useFetchProducts from "../utils/useFetchProducts"



export default function ProductList() {

const { data, loading, error } = useFetchProducts('https://dummyjson.com/products?limit=100');
const [filteredData,setFilteredData] = useState([]);

useEffect(()=>{
  if(data){
  setFilteredData(data)
  }

},[data])

function handleSearch(event){
  // console.log(event.target.value)
  if(event.target.value === ""){
    setFilteredData(data);
  }else{
    // const newData = filteredData.filter((product)=>  {return product.title == event.target.value});
    setFilteredData(data.filter((product)=>  {return product.title.toLowerCase().includes(event.target.value.toLowerCase())}));
    // console.log(filteredData);
  }


}

 if(loading){
    return <p>Loading...</p>
 }


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
   <h2 className="text-5xl leading-tight font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl mb-4">
  Your Online <mark className="bg-gray-800 text-white px-4 rounded-xl">Shopping Hub</mark>
</h2>
<p className="mt-2 text-md text-gray-600  sm:max-w-[60%] max-w-[100%]">
  Discover and shop from a wide range of products—all in one place. Add items to your cart, explore detailed product info, and enjoy a seamless checkout experience with <strong>ShoppyGlobe</strong>.
</p>
<div className="mb-20 mt-6">
  <input onChange={handleSearch} className="p-4 border rounded-md text-gray-600 w-[-webkit-fill-available]" type="text" placeholder="Search for products"></input>
</div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredData.map((product) => (
          <ProductItem key={product.id} data={product} />
          ))}
        </div>
      </div>
      
    </div>
    
  )
}
