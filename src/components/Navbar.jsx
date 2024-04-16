import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Link } from '@mui/material';
import { GlobalStyles } from '@mui/material';   //get rid spaces between appbar and webpage
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['Jobs', 'Companies', 'About', 'Contact', 'Blog'];
const settings = ['Dashboard', 'Settings'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
            <AppBar position="static" sx={{ backgroundColor: 'white', borderBottom: '1px solid black' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Poppins',
                                fontWeight: 800,
                                fontSize: '2rem',
                                letterSpacing: '.05rem',
                                color: '#2a68ff',
                                textDecoration: 'none',
                                mr: 62, // Increase the margin-right for more space
                                ml: 15
                            }}
                        >
                            ProFolio
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="black"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>

                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'Poppins',
                                fontWeight: 800,
                                fontSize: '2rem',
                                letterSpacing: '.05rem',
                                color: '#2a68ff',
                                textDecoration: 'none',
                            }}
                        >
                            ProFolio
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: '#6f6f6f',
                                        display: 'block',
                                        fontFamily: 'Poppins',
                                        fontWeight: 200,
                                        fontSize: '1.2rem',
                                        mr: 2, // Increase the margin-right for more space
                                        textTransform: 'none', // Prevents all caps
                                        '&:hover::before': {
                                            content: '""',
                                            position: 'absolute',
                                            height: '4px',
                                            width: '100%',
                                            background: '#2a68ff',
                                            right: '0',
                                            bottom: '-10px',
                                            color: '#2a68ff',
                                        }
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 15 }}>
                                    <Avatar alt="Jess Kim" src="src/assets/jess.png" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default Navbar;