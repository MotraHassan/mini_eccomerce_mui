import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import "./home.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useGetproductsByNameQuery } from "../../Redux/ProductsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  addToCart,
  decreaseQuantity,
} from "../../Redux/cartSlice";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "#fff",
  },
}));

export default function Home() {
  const nav = useNavigate();
  const theme = useTheme();
  const { data, error, isLoading } = useGetproductsByNameQuery();
  const dispatch = useDispatch();
  const { selectedProducts, selectedProductsID } = useSelector(
    (state) => state.cart
  );

  function productQuantity(productAPI) {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === productAPI.id;
    });
    if (myProduct) {
      return myProduct.quantity;
    }
  }

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
          Error From Server
        </Typography>
      </Box>
    );
  }
  if (data && !isLoading) {
    return (
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap="40px"
        padding="40px"
      >
        {data.map((product, i) => (
          <Card className="card" key={i} sx={{ maxWidth: 280 }}>
            <CardMedia
              component="img"
              height="300"
              image={product.imageLink[0]}
              alt="Paella dish"
              onClick={() => {
                nav(`product/${product.id}`);
              }}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </CardContent>

            <CardActions
              sx={{ justifyContent: "space-between" }}
              disableSpacing
            >
              {/* Toogle Buttons Add To Cart */}
              {selectedProductsID.includes(product.id) ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    sx={{ mr: "10px" }}
                    color="primary"
                    onClick={() => {
                      dispatch(decreaseQuantity(product));
                    }}
                  >
                    <Remove />
                  </IconButton>
                  <StyledBadge
                    badgeContent={productQuantity(product)}
                    color="primary"
                  />
                  <IconButton
                    size="small"
                    color="primary"
                    sx={{ ml: "10px" }}
                    onClick={() => {
                      dispatch(addQuantity(product));
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
                    dispatch(addToCart(product));
                  }}
                >
                  <ShoppingCart sx={{mr:'5px',fontSize:'18px'}}/> Add to cart
                </Button>
              )}

              <Typography
                mr={1}
                variant="body1"
                color={theme.palette.error.light}
              >
                €{product.price}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </Stack>
    );
  }
}
