import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiChartPie}
                className={
                  "/dashboard" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                <Link to="/dashboard">Dashboard</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiShoppingBag}
                className={
                  "/e-commerce/products" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to="/e-commerce/products">Product</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiUsers}
                className={
                  "/users/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                <Link to="/users/list">User List</Link>
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                Sign in
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                Sign up
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/"
                icon={HiClipboard}
              >
                Docs
              </Sidebar.Item>
              <Sidebar.Item
                href="https://flowbite-react.com/"
                icon={HiCollection}
              >
                Components
              </Sidebar.Item>
              <Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/issues"
                icon={HiInformationCircle}
              >
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
