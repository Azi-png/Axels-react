import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const newProductsRetriever = createSelector(
  retrieveNewProducts,
  (newProducts) => ({
    newProducts,
  })
);

export default function NewProducts() {
  const { newProducts } = useSelector(newProductsRetriever);

  console.log("newDProducts:", newProducts);

  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Our New Arrivals</Box>
          <Stack className="cards-frame">
            {newProducts.length !== 0 ? (
              newProducts.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <CssVarsProvider key={product._id}>
                    <Stack direction="column" spacing={1}>
                      <Card
                        sx={{
                          backgroundColor: "white",
                          border: "none",
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "white",
                            border: "none",
                            boxShadow: "none", // agar hover paytida soyasi chiqsa ham o‘chadi
                          },
                        }}
                        variant="plain"
                        className="card"
                      >
                        <CardCover>
                          <img
                            src={imagePath}
                            alt={product.productName}
                            style={{
                              borderRadius: 0,
                              transition: "transform 0.3s ease",
                            }}
                            className="product-image"
                          />
                        </CardCover>
                        <CardCover className="card-cover" />
                      </Card>

                      {/* Product Name */}
                      <Typography
                        textColor="black"
                        sx={{
                          mt: "4px !important",
                          fontWeight: "bold",
                          "&:hover": {
                            color: "#c4a57b",
                            cursor: "pointer",
                          },
                        }}
                      >
                        {product.productName}
                      </Typography>

                      {/* Product Price */}
                      <Typography
                        textColor="black"
                        sx={{
                          mt: "0 !important",
                          color: "gray",
                          "&:hover": {
                            color: "#c4a57b",
                            cursor: "pointer",
                          },
                        }}
                      >
                        ${product.productPrice}
                      </Typography>
                    </Stack>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data"> New Products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
