import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./createContext/AuthContext";


export default function NavbarComponent() {
  const navigate=useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {userLogin,setuserLogin} =useContext(authContext)

    const LoggedItems = [
    'home',
   'Log Out'
  ];

      const UnLoggedItems = [
    'login',
    'register',
  ];

  function logOut(){
    localStorage.removeItem('token')
    setuserLogin(null)
    navigate('/login')

  }

  return (
    <Navbar>

     <NavbarMenuToggle
         aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarBrand>
        <p className="font-bold text-inherit">Sociall App</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
         {userLogin && ( <NavbarItem>
          <Link className="me-2"  to="/">
           Home
          </Link>
            <Link  to="/profile">
           profile
          </Link>
        </NavbarItem> )}
   
      {userLogin == null && ( <>
       <NavbarItem>
          <Link  to="/login">
           login
          </Link>
        </NavbarItem>     
          <NavbarItem>
          <Link  to="/Register">
          register
          </Link>
        </NavbarItem></> )}    
      
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="configurations"> <Link>profile</Link> </DropdownItem>
            <DropdownItem key="logout" color="danger " onClick={()=> logOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

       <NavbarMenu>
        {userLogin ? LoggedItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
            onClick={()=> logOut() }
              className="w-full block"
              color={
                index === 2 
                ? "primary" 
                : index === LoggedItems.length - 1 
                ? "danger" : "foreground"
              }
            to={`${item == 'Log Out' && '/login' }`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        )) : UnLoggedItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full block"
              color={
                index === 2 
                ? "primary" 
                : index === UnLoggedItems.length - 1 
                ? "danger" : "foreground"
              }
            to={`${item}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
