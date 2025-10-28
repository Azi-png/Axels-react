import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <div className="static-frame">
      <Container>
        <Stack className="info">
          <Stack className="static-box" sx={{ marginRight: "20px" }}>
            <Box className="static-num" sx={{ marginBottom: "15px" }}>
              <img src="/icons/diamond-icon.svg" alt="" />
            </Box>
            <Stack direction="column" sx={{ marginTop: "30px" }}>
              <Box className="static-text-1">Certified</Box>
              <Box
                className="static-text"
                sx={{
                  width: 266,
                  height: 20,
                }}
              >
                Available certificates of authenticity
              </Box>
            </Stack>
          </Stack>

          <Stack className="static-box" sx={{ marginRight: "20px" }}>
            <Box className="static-num" sx={{ marginBottom: "15px" }}>
              <img src="/icons/Secure-Icon.svg" alt="" />
            </Box>
            <Stack direction="column" sx={{ marginTop: "30px" }}>
              <Box className="static-text-1">Secure</Box>
              <Box
                className="static-text"
                sx={{
                  width: 266,
                  height: 24,
                }}
              >
                Certified marketplace since 2017
              </Box>
            </Stack>
          </Stack>
          <Stack className="static-box" sx={{ marginRight: "20px" }}>
            <Box className="static-num" sx={{ marginBottom: "15px" }}>
              <img src="/icons/Delivery-Icon.svg" alt="" />
            </Box>
            <Stack direction="column" sx={{ marginTop: "30px" }}>
              <Box className="static-text-1">Shipping</Box>
              <Box
                className="static-text"
                sx={{
                  width: 266,
                  height: 24,
                }}
              >
                Free, fast, and reliable worldwide
              </Box>
            </Stack>
          </Stack>
          <Stack className="static-box" sx={{ marginRight: "15px" }}>
            <Box className="static-num" sx={{ marginBottom: "15px" }}>
              <img src="/icons/Package-Icon.svg" alt="" />
            </Box>
            <Stack direction="column" sx={{ marginTop: "30px" }}>
              <Box className="static-text-1">Transparent</Box>
              <Box
                className="static-text"
                sx={{
                  width: 266,
                  height: 24,
                }}
              >
                Hassle-free return policy
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
