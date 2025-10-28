import React, { useState } from "react";
import { Box, Button, Stack, Drawer, IconButton, Badge } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory, useLocation } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../sevices/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;

  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const location = useLocation();
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );

  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  // Drawer uchun state
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state: boolean) => () => setOpen(state);

  const proceedOrderHandler = async () => {
    try {
      setOpen(false);
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const cartIconPath =
    location.pathname === "/"
      ? "/icons/cart-icon.svg"
      : "/icons/cart-icon-products.svg";

  return (
    <Box className={"hover-line"}>
      <IconButton aria-label="cart" onClick={toggleDrawer(true)}>
        <Badge
          badgeContent={cartItems.length}
          color="secondary"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "white",
              color: "#967747",
              fontWeight: "bold",
              fontSize: "14px",
            },
          }}
        >
          <img src={cartIconPath} alt="cart" />
        </Badge>
      </IconButton>

      {/* Drawer - o‘ngdan chiqadi */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 660, p: 2 }}>
          <Stack sx={{ width: 660, p: 2 }} className={"basket-frame"}>
            <Box className={"all-check-box"}>
              {cartItems.length === 0 ? (
                <Box sx={{ fontSize: "38px", fontWeight: 500 }}>
                  Cart is Empty!
                </Box>
              ) : (
                <Stack flexDirection={"row"} alignItems="center">
                  <Box
                    sx={{
                      fontSize: "38px",
                      fontWeight: 500,
                      marginRight: "230px",
                    }}
                  >
                    My Cart
                  </Box>
                  <Box
                    sx={{
                      ml: "135px",
                      cursor: "pointer",
                      fontSize: "40px", // X kattaroq chiqadi
                      color: "gray",
                      fontWeight: 100,
                    }}
                    onClick={() => onDeleteAll()}
                  >
                    X
                  </Box>
                </Stack>
              )}
            </Box>

            <Box className={"orders-main-wrapper"}>
              <Box
                sx={{ maxHeight: 900, overflowY: "auto" }}
                className={"orders-wrapper"}
              >
                {cartItems.map((item: CartItem) => {
                  const imagePath = `${serverApi}/${item.image}`;
                  return (
                    <Box
                      className={"basket-info-box"}
                      key={item._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        position: "relative",
                        padding: 1,
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      {/* Cancel (X) tugmasi */}
                      <CancelIcon
                        onClick={() => onDelete(item)}
                        color="primary"
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          cursor: "pointer",
                          color: "gray",
                        }}
                      />

                      {/* Rasm */}
                      <img
                        src={`${serverApi}/${item.image}`}
                        alt={item.name}
                        style={{
                          width: 200,
                          height: 220,
                          objectFit: "cover",

                          flexShrink: 0,
                        }}
                      />

                      {/* Malumotlar ustuni */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: 1,
                          flexGrow: 1,
                        }}
                      >
                        <span
                          className={"product-name"}
                          style={{
                            margin: 0,
                            fontWeight: "bold",
                            fontSize: 30,
                          }}
                        >
                          {item.name}
                        </span>
                        <p
                          className={"product-price"}
                          style={{ margin: 0, fontSize: 20 }}
                        >
                          ${item.price} x {item.quantity}
                        </p>

                        {/* Quantity boshqaruv tugmalari */}
                        <Box sx={{ mt: 1 }}>
                          <button
                            className="remove"
                            onClick={() => onRemove(item)}
                            style={{
                              width: 30,
                              height: 30,
                              marginRight: 10,
                              cursor: "pointer",
                            }}
                          >
                            -
                          </button>
                          <button
                            className="add"
                            onClick={() => onAdd(item)}
                            style={{
                              width: 30,
                              height: 30,
                              cursor: "pointer",
                            }}
                          >
                            +
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {cartItems.length !== 0 && (
              <Box className={"basket-order"}>
                <span className={"price"}>
                  Jami: ${totalPrice} ({itemsPrice} + {shippingCost})
                </span>
                <Button
                  onClick={proceedOrderHandler}
                  startIcon={<ShoppingCartIcon />}
                  variant="contained"
                  sx={{
                    width: 600, // eniga uzunroq
                    height: 75, // bo‘yiga balandroq
                    fontSize: "18px", // matn kattaligi
                    fontWeight: "bold",
                    borderRadius: 0,
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#b5956a", // to‘q tillarang (dark brown)
                      color: "white",
                    },
                  }}
                >
                  Buyurtma berish
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
