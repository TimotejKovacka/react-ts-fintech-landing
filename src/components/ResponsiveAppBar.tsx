import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  createSearchParams,
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";
import { appBarItems } from "./consts/appBarItems";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleFundChange = (e: SelectChangeEvent) => {
    navigate({
      pathname: "funds",
      search: createSearchParams({
        fundId: e.target.value,
      }).toString(),
    });
  };

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ color: "#1c73e8" }}>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <FormControl size="small">
                <Select
                  id="our-funds-select-autowidth"
                  autoWidth
                  displayEmpty
                  value=""
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <span>Our Funds</span>;
                    }
                  }}
                  onChange={handleFundChange}
                  sx={{
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  }}
                >
                  <MenuItem value={0}>FintechX MiX 10 Gold</MenuItem>
                  <MenuItem value={1}>FintechX MiX 10 Platinum</MenuItem>
                </Select>
              </FormControl>
              {appBarItems.map((appBarItem) => (
                <MenuItem key={appBarItem.id} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={RouterLink}
                    to={appBarItem.route}
                    sx={{ textDecoration: "none", color: "#000" }}
                  >
                    {appBarItem.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            <FormControl size="small">
              <Select
                id="our-funds-select-autowidth"
                autoWidth
                displayEmpty
                value=""
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span>Our Funds</span>;
                  }
                }}
                onChange={handleFundChange}
                sx={{
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
              >
                <MenuItem value={0}>FintechX MiX 10 Gold</MenuItem>
                <MenuItem value={1}>FintechX MiX 10 Platinum</MenuItem>
              </Select>
            </FormControl>
            {appBarItems.map((appBarItem) => (
              <Button
                key={appBarItem.id}
                component={RouterLink}
                to={appBarItem.route}
                sx={{
                  color: "rgba(0, 0, 0, 0.87)",
                  fontWeight: 400,
                  display: "block",
                }}
              >
                {appBarItem.label}
              </Button>
            ))}
            <Button
              variant="outlined"
              component={RouterLink}
              to="get-early-access"
              sx={{ ml: 3 }}
            >
              Get Early Access
              <ArrowForwardIcon sx={{ ml: 1 }} />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
