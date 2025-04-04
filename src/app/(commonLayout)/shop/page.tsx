// "use client";

// const Shop = () => {
//   const dispatch = useDispatch();
//   const { departments, loading, error } = useSelector(
//     (state: RootState) => state.departments
//   );

//   useEffect(() => {
//     dispatch(fetchDepartments());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       {departments?.map((department) => (
//         <div key={department._id} className="department">
//           <h2>{department.name}</h2>
//           <div className="categories">
//             {department.categories.map((category) => (
//               <div key={category._id} className="category">
//                 <h3>{category.name}</h3>
//                 <div className="products">
//                   {category.products.map((product) => (
//                     <div key={product._id} className="product">
//                       <h4>{product.name}</h4>
//                       <p>Price: ${product.price}</p>
//                       <p>Stock: {product.stock}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Shop;
