import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order-page"}>
      <Container className={"order-container"}>
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box
              sx={{ borderBottom: 2, borderColor: "divider", width: 679 }}
              className={"order-nav-frame"}
            >
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={"/icons/default-user.svg"}
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon-box"}>
                  <img
                    src={"/icons/user-badge.svg"} //bu kichkinasi
                    className={"order-user-prof_img"}
                  />
                </div>
              </div>
              <span className={"order-user-name"}>Martin</span>
              <span className={"order-user-prof"}>User</span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon /> South Korea, Seoul
              </div>
            </Box>
          </Box>
          <Box className="card-form">
            <Box component="form" className="form-container">
              <Box className="input-box">
                <input
                  type="text"
                  placeholder="Card number : 5243 4090 2002 7495"
                  className="card-input"
                />
              </Box>

              <Box className="card-info">
                <input
                  type="text"
                  placeholder="07 / 24"
                  className="card-input small"
                />
                <input
                  type="text"
                  placeholder="CVV : 010"
                  className="card-input small"
                />
              </Box>

              <Box className="input-box">
                <input
                  type="text"
                  placeholder="Justin Robertson"
                  className="card-input"
                />
              </Box>
            </Box>

            <Box className="payment-methods">
              <img src="/icons/western-card.svg" alt="Western Union" />
              <img src="/icons/master-card.svg" alt="MasterCard" />
              <img src="/icons/paypal-card.svg" alt="PayPal" />
              <img src="/icons/visa-card.svg" alt="Visa" />
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
