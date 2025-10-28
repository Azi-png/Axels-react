import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Slider,
  Stack,
  Typography,
  Pagination,
  PaginationItem,
  Badge,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import {
  Product,
  ProductInquiry,
  ProductListResponse,
} from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import ProductService from "../../sevices/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import SearchIcon from "@mui/icons-material/Search";

/** REDUX DISPATCH */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 20,
    order: "createdAt",
    productCollection: ProductCollection.RING,
    search: "",
    minPrice: 0,
    maxPrice: 9900,
    material: "",
    // brand: "",
    // size: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 9900,
  });
  const history = useHistory();

  useEffect(() => {
    const productService = new ProductService();
    productService
      .getProducts(productSearch)
      .then((data) => {
        console.log("API response:", data); // Bu yerda nima kelayotganini ko'ring
        console.log("Products count:", data.products.length);
        console.log("Current search params:", productSearch);
        // 1) Mahsulotlarni saqlash
        setProducts(data.products);

        // 2) Narx diapazonini o‘rnatish
        setPriceRange({
          min: data.minPrice,
          max: data.maxPrice,
        });

        // 3) Umumiy sahifalar sonini hisoblash
        // setTotalPages(Math.ceil(data.totalCount / productSearch.limit));
      })
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  // Filter o'zgarishi
  const searchPriceHandler = (min: number, max: number) => {
    productSearch.page = 1;
    productSearch.minPrice = min;
    productSearch.maxPrice = max;
    setProductSearch({ ...productSearch });
  };

  const handleCheckboxChange = (type: string, value: string) => {
    setProductSearch({ ...productSearch, [type]: value, page: 1 });
  };

  const clearFilters = () => {
    setProductSearch({
      page: 1,
      limit: 20,
      order: "createdAt",
      productCollection: ProductCollection.RING,
      search: "",
      minPrice: 0,
      maxPrice: 9999999,
      material: "",
      brand: "",
      size: "",
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Stack
        sx={{
          // border: "1px solid gray",

          marginLeft: "800px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
        className="single-search-form"
        direction="row"
        // alignItems="center"
        // spacing={1}
      >
        <Stack className={"products-filter-section"}>
          <Stack
            className={"products-filter-box"}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              Sort:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={productSearch.order || ""}
                onChange={(event) => searchOrderHandler(event.target.value)}
                displayEmpty
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Choose option
                </MenuItem>
                <MenuItem value="createdAt">New</MenuItem>
                <MenuItem value="productPrice">Price</MenuItem>
                <MenuItem value="productViews">Views</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <input
          type="search"
          className={"single-search-input"}
          name="singleSearch"
          placeholder={"Search products"}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchProductHandler();
          }}
          style={{
            // padding: "8px 12px",
            backgroundColor: "white !important",
            width: "143px",
            fontSize: "17px",
            borderRadius: "5px",
            border: "none",
            outline: "none",
            // marginTop: "15px",
          }}
          onFocus={(e) => (e.target.style.backgroundColor = "white")}
        />

        <Button
          sx={{
            minWidth: "30px",
            width: "30px",
            height: "30px",
            // padding: "4px",
            color: "black",
            "&:hover": {
              backgroundColor: "transparent",
            },
            "&:focus": {
              backgroundColor: "transparent",
            },
            "&:active": {
              backgroundColor: "transparent",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "transparent",
            },
          }}
          disableRipple
          disableFocusRipple
          disableTouchRipple
          className="single-button-search"
          endIcon={<SearchIcon style={{ color: "black", marginTop: "15px" }} />}
          onClick={searchProductHandler}
        ></Button>
      </Stack>

      <Stack direction="row" spacing={4}>
        {/* ===== CHAP FILTER PANEL ===== */}
        <Box sx={{ width: "250px" }}>
          <Typography variant="h6" fontWeight={600}>
            Categories
          </Typography>

          <Button
            variant="text"
            sx={{
              color:
                productSearch.productCollection === ProductCollection.RING
                  ? "secondary.main"
                  : "#333333",
              "&:hover": {
                color:
                  productSearch.productCollection === ProductCollection.RING
                    ? "black"
                    : "secondary.dark",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => searchCollectionHandler(ProductCollection.RING)}
          >
            Rings
          </Button>

          <Button
            variant="text"
            sx={{
              color:
                productSearch.productCollection === ProductCollection.EARRING
                  ? "secondary.main"
                  : "#333333",
              "&:hover": {
                color:
                  productSearch.productCollection === ProductCollection.EARRING
                    ? "black"
                    : "secondary.dark",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => searchCollectionHandler(ProductCollection.EARRING)}
          >
            Earrings
          </Button>

          <Button
            variant="text"
            sx={{
              color:
                productSearch.productCollection ===
                ProductCollection.WOMANS_WATCHES
                  ? "secondary.main"
                  : "#333333",
              "&:hover": {
                color:
                  productSearch.productCollection ===
                  ProductCollection.WOMANS_WATCHES
                    ? "black"
                    : "secondary.dark",
                backgroundColor: "transparent",
              },
            }}
            onClick={() =>
              searchCollectionHandler(ProductCollection.WOMANS_WATCHES)
            }
          >
            Woman's Watches
          </Button>

          <Button
            variant="text"
            sx={{
              color:
                productSearch.productCollection === ProductCollection.NECKLACE
                  ? "secondary.main"
                  : "#333333",
              "&:hover": {
                color:
                  productSearch.productCollection === ProductCollection.NECKLACE
                    ? "black"
                    : "secondary.dark",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => searchCollectionHandler(ProductCollection.NECKLACE)}
          >
            Necklace
          </Button>

          {/* <Button
            variant="text"
            sx={{
              color:
                productSearch.productCollection === ProductCollection.RING
                  ? "secondary.main"
                  : "#333333",
              "&:hover": {
                color:
                  productSearch.productCollection === ProductCollection.RING
                    ? "black"
                    : "secondary.dark",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => searchCollectionHandler(ProductCollection.RING)}
          >
            Rings
          </Button> */}

          <Button
            variant="text"
            sx={{
              color:
                productSearch.productCollection === ProductCollection.BRACELET
                  ? "secondary.main"
                  : "#333333",
              "&:hover": {
                color:
                  productSearch.productCollection === ProductCollection.BRACELET
                    ? "black"
                    : "secondary.dark",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => searchCollectionHandler(ProductCollection.BRACELET)}
          >
            Bracelets
          </Button>
          {/* <Button
            variant="text"
            sx={{
              color:
                productSearch.productCollection === ProductCollection.NECKLACE
                  ? "secondary.main"
                  : "#333333",
              "&:hover": {
                color:
                  productSearch.productCollection === ProductCollection.NECKLACE
                    ? "black"
                    : "secondary.dark",
                backgroundColor: "transparent",
              },
            }}
            onClick={() => searchCollectionHandler(ProductCollection.NECKLACE)}
          >
            Necklaces
          </Button> */}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight={600}>
            Price
          </Typography>
          {/* <Slider
            value={[
              productSearch.minPrice ?? priceRange.min,
              productSearch.maxPrice ?? priceRange.max,
            ]}
            onChange={(e, newValue) => {
              const [min, max] = newValue as number[];
              setProductSearch((prev) => ({
                ...prev,
                minPrice: min,
                maxPrice: max,
              }));
            }}
            valueLabelDisplay="auto"
            min={priceRange.min}
            max={priceRange.max}
          /> */}
          <Slider
            sx={{
              color: "#d7b586",
              height: 2, // chiziq balandligi ingichka
              padding: "10px 0", // dumaloqcha uchun joy
              "& .MuiSlider-track": {
                height: 2,
              },
              "& .MuiSlider-rail": {
                height: 2,
              },
              "& .MuiSlider-thumb": {
                height: 20,
                width: 20,
                backgroundColor: "#d7b586",
                "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                  boxShadow: "inherit",
                },
                "&:before": {
                  display: "none",
                },
              },
            }}
            value={[
              productSearch.minPrice ?? priceRange.min,
              productSearch.maxPrice ?? priceRange.max,
            ]}
            onChange={(e, newValue) => {
              // Slider harakatlanayotgan paytda faqat UI yangilanadi
              const [min, max] = newValue as number[];
              setProductSearch((prev) => ({
                ...prev,
                minPrice: min,
                maxPrice: max,
              }));
            }}
            onChangeCommitted={(e, newValue) => {
              // Foydalanuvchi qo‘yib yuborgandan keyin API chaqiriladi
              const [min, max] = newValue as number[];
              setProductSearch((prev) => ({
                ...prev,
                page: 1,
                minPrice: min,
                maxPrice: max,
              }));
            }}
            valueLabelDisplay="auto"
            min={priceRange.min}
            max={priceRange.max}
          />

          <Typography variant="body2">
            Price: ${productSearch.minPrice} - ${productSearch.maxPrice}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight={600}>
            Material
          </Typography>
          {["GOLD", "SILVER", "PLATINUM"].map((mat) => (
            <FormControlLabel
              key={mat}
              control={
                <Checkbox
                  checked={productSearch.material === mat}
                  onChange={() => handleCheckboxChange("material", mat)}
                  sx={{ color: "#d7b586" }}
                />
              }
              label={mat}
            />
          ))}

          <Divider sx={{ my: 2 }} />

          <Button sx={{ mt: 2, color: "black" }} onClick={clearFilters}>
            X CLEAR ALL FILTER
          </Button>
        </Box>

        {/* ===== O‘NG TOMON PRODUCT LIST ===== */}
        <Box flex={1}>
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {products.length !== 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Stack
                    key={product._id}
                    className="product-card"
                    onClick={() => chooseProductHandler(product._id)}
                    sx={{
                      // border: "1px solid #eee",
                      // borderRadius: "8px",
                      width: "230px",
                      height: "370px",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "300px",
                        backgroundImage: `url(${imagePath})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          height: "300px",
                          backgroundImage: `url(${imagePath})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          "&:hover .add-to-cart-btn": {
                            opacity: 1,
                            transform: "translate(-50%, 0)", // markazda va pastdan keladi
                          },
                        }}
                      >
                        <Button
                          className="add-to-cart-btn"
                          sx={{
                            borderRadius: 0,
                            position: "absolute",
                            bottom: "8px",
                            left: "50%",
                            transform: "translate(-50%, 20px)", // boshlanishida pastroqda
                            width: "180px", // kenglik
                            height: "40px", // balandlik
                            fontSize: "14px",
                            backgroundColor: "white",
                            color: "black",
                            opacity: 0,
                            transition:
                              "opacity 0.3s ease, transform 0.3s ease", // yumshoq chiqish
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                          }}
                        >
                          Add to cart
                        </Button>
                      </Box>

                      {/* <Badge
                        // badgeContent={product.productViews}
                        color="secondary"
                        sx={{ position: "absolute", top: "8px", right: "8px" }}
                      >
                        <RemoveRedEyeIcon sx={{ color: "white" }} />
                      </Badge> */}
                    </Box>
                    <Box p={1}>
                      <Typography fontWeight={600}>
                        {product.productName}
                      </Typography>
                      <Stack
                        sx={{ color: "grey" }}
                        direction="row"
                        alignItems="center"
                      >
                        $<Typography>{product.productPrice}</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                );
              })
            ) : (
              <Box>Products are not available!</Box>
            )}
          </Stack>

          <Stack alignItems="center" mt={4} mb={6}>
            <Pagination
              count={productSearch.page + 1}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
