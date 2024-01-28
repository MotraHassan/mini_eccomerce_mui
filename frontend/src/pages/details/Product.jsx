import React, { useRef, useState } from "react";
import "./product.css";
import { useGetOneProductQuery } from "../../Redux/ProductsApi";
import { Badge, Box, Button, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addQuantity, addToCart, decreaseQuantity } from "../../Redux/cartSlice";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import styled from "@emotion/styled";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "#fff",
  },
}));
export default function Product() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetOneProductQuery(id);
  const [index, setindex] = useState(0);
  const myRef = useRef(null);
  const { selectedProducts, selectedProductsID } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();


  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  function productQuantity(productAPI){
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === productAPI.id;
    });
    if(myProduct){
      return myProduct.quantity;
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          Error for server
        </Typography>
      </Box>
    );
  }

  if (data && !isLoading) {
    console.log(data);
    return (
      <Stack padding="40px" mt="60px">
        <div className="app details-page">
          <div className="details">
            <div className="big-img">
              <img src={data.imageLink[index]} alt="" />
            </div>

            <div className="box">
              <div className="row">
                <h2>{data.productName}</h2>
                <span>${data.price}</span>
              </div>
              <p>{data.description}</p>

              <div className="thumb" ref={myRef}>
                {data.imageLink.map((img, index) => (
                  <img
                    src={img}
                    alt=""
                    key={index}
                    onClick={() => handleTab(index)}
                  />
                ))}
              </div>

              {selectedProductsID.includes(data.id) ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    sx={{ mr: "10px" }}
                    color="primary"
                    onClick={() => {
                      dispatch(decreaseQuantity(data));
                    }}
                  >
                    <Remove />
                  </IconButton>
                  <StyledBadge
                    badgeContent={productQuantity(data)}
                    color="primary"
                  />
                  <IconButton
                    size="small"
                    color="primary"
                    sx={{ ml: "10px" }}
                    onClick={() => {
                      dispatch(addQuantity(data));
                    }}
                  >
                    <Add />
                  </IconButton>
                </div>
              ) : (
                <Button
                  sx={{ textTransform: "capitalize", p: 1, lineHeight: "1.1" }}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(addToCart(data));
                  }}
                >
                  <ShoppingCart sx={{mr:'5px',fontSize:'18px'}}/> Add to cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </Stack>
    );
  }
}
