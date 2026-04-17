import { useEffect, useState } from "react";
import API from "../api/axios";
import {useNavigate} from 'react-router-dom'
function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  const role=localStorage.getItem("role")
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product");
      setProducts(res.data);
      console.log(res.data)
      
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id) => {
    API.post("/cart/add",{productId:id})
      .then((res)=>{
        if(res.status==201){
          alert("Added to cart")
          navigate("/cart")
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  };

  return (
    <div className="container mt-5">
      <h2>Products</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((p) => (
              <div className="col-md-3" key={p._id}>
                <div className="card mb-3 px-3">
                  <img
                    src={p.image}
                    className="card-img-top"
                    alt={p.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />

                  <div className="card-body">
                    <h5>{p.name}</h5>
                    <p>₹{p.price}</p>
                    <p>{p.description}</p>
                    {
                      role=="user"&&<button
                                          className="btn btn-success w-100"
                                          onClick={() => addToCart(p._id)}
                                        >
                                          Add to Cart
                                        </button>
                    }
                    
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
