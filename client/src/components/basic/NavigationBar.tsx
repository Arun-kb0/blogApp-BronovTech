import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { logout } from "../../features/auth/authApi";
import { selectAuthUser } from "../../features/auth/authSlice";


const NavigationBar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector(selectAuthUser)

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleLogout = () => {
    (async () => {
      await dispatch(logout()).unwrap()
      navigate('/login')
    })()
  }

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

      <Typography
        as="li"
        type="small"
        className="p-1 font-normal"
      >
        <Link to='/' className="flex items-center">
          Home
        </Link>
      </Typography>

      <Typography
        as="li"
        type="small"
        className="p-1 font-normal"
      >
        <Link to='/create' className="flex items-center">
          create
        </Link>
      </Typography>
    </ul>
  );


  return (
    <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between ">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium capitalize"
        >
          Reflection
        </Typography>
        <div className="mr-4 hidden lg:block">{navList}</div>
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="hidden lg:inline-block"
        >
          Logout
        </Button>
        <IconButton
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {navList}
        <Button
          onClick={handleLogout}
          isFullWidth
          variant="gradient"
          size="sm"
        >
          <span>Logout</span>
        </Button>
      </Collapse>
    </Navbar>
  );
}

export default NavigationBar