import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR */

const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts })
);

export default function PopularProducts() {
  const { popularProducts } = useSelector(popularProductsRetriever);

  console.log("popularProducts:", popularProducts);

  return (
    <div className="popular-products-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title"> Our Featured Products</Box>
          <Stack className="cards-frame">
            {popularProducts.length !== 0 ? (
              popularProducts.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Stack direction="column" spacing={1}>
                      {" "}
                      <Card className="card">
                        <CardCover>
                          <img
                            src={imagePath}
                            alt=""
                            style={{
                              borderRadius: 0,
                              transition: "transform 0.3s ease  !important",
                            }}
                            className="product-image"
                          />
                        </CardCover>
                        <CardCover className="card-cover" />

                        {/* <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid white",
                          height: "60px",
                         
                        }}
                      >
                        <Typography
                          // startDecorator={<DescriptionOutlinedIcon />}
                          textColor="black"
                        >
                          ${product.productPrice}
                        </Typography>
                      </CardOverflow> */}
                      </Card>{" "}
                      <Typography
                        textColor="black"
                        sx={{
                          mt: "4px !important",
                          fontWeight: "bold", // nom uchun qalinroq
                          "&:hover": {
                            color: "#c4a57b", // hoverda jigarrangga o‘zgaradi
                            cursor: "pointer", // hoverda kursor ham o‘zgaradi (ixtiyoriy)
                          },
                        }}
                      >
                        {product.productName}
                      </Typography>
                      <Typography
                        textColor="black"
                        sx={{
                          mt: "0 !important", // ustidan bo'shliq yo'q
                          color: "gray", // qora rangdan sal ochroq kulrang (dark gray)
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
              <Box className="no-data"> Popular Products are not avaiable!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
