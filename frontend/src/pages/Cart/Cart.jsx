import {
  Box,
  Button,
  Paper,
  styled,
  IconButton,
  Badge,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import "./cart.css";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuantity,
  decreaseQuantity,
  deleteProduct,
} from "../../Redux/cartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));

export default function Cart() {
  const { selectedProducts } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let subTotal = 0;
  return (
    <Box>
      {selectedProducts.map((product, i) => {
        subTotal += +product.price * +product.quantity;
        return (
          <Paper key={i} dir="rtl" className="item-container">
            <div className="img-title-parent">
              <img
                src={product.imageLink[0]}
                alt="img"
                style={{
                  marginBottom: "5px",
                  borderRadius: "4px",
                  width: "70px",
                  height: "75px",
                }}
              />
              <p className="product-name">{product.productName}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ color: "#1976d2", ml: "10px" }}
                onClick={() => {
                  dispatch(addQuantity(product));
                }}
              >
                <Add />
              </IconButton>

              <StyledBadge badgeContent={product.quantity} />

              <IconButton
                sx={{ color: "#1976d2", mr: "10px" }}
                onClick={() => {
                  dispatch(decreaseQuantity(product));
                }}
              >
                <Remove />
              </IconButton>
            </div>

            <div className="price">${+product.price * +product.quantity}</div>

            <Button
              sx={{ display: { xs: "none", md: "inline-flex" } }}
              variant="text"
              color="error"
              onClick={() => {
                dispatch(deleteProduct(product));
              }}
            >
              delete
            </Button>
            <IconButton
              sx={{
                color: "#ef5350",
                display: { xs: "inline-flex", md: "none" },
              }}
              onClick={() => {
                dispatch(deleteProduct(product));
              }}
            >
              <Delete />
            </IconButton>
          </Paper>
        );
      })}

      <Paper sx={{ width: "200px", mx: "auto", my: "60px" }}>
        <Typography align="center" p={2} variant="h6">
          Cart Summary
        </Typography>
        <Divider />
        <Stack
          sx={{ justifyContent: "space-between", p: 1.2 }}
          direction={"row"}
        >
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">€ {subTotal}</Typography>
        </Stack>
        <Button fullWidth color="primary" variant="contained">
          CHECKOUT
        </Button>
      </Paper>
    </Box>
  );
}
