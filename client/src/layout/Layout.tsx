// Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Stack, Box } from "@mui/material";

const Layout = () => {
  return (
    <div>
      <Stack direction="row" sx={{ height: "100vh" }}>
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fcf803", // Optional background color for content area
          }}
        >
          <Navbar />
        </Box>

        <Box
          sx={{
            flex: 3,
            // Optional padding for the content area
            backgroundColor: "#f5f5f5", // Optional background color for content area
          }}
        >
          <Outlet /> {/* Render the main content here */}
        </Box>
      </Stack>
    </div>
  );
};

export default Layout;
