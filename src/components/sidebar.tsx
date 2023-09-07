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
import { Dropdown } from 'flowbite-react';
import {FaFileInvoiceDollar,FaGifts} from "react-icons/fa"
import {MdLoyalty} from "react-icons/md"
import { Link } from "react-router-dom";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
              <Link to="/dashboard">
                <Sidebar.Item
                  icon={HiChartPie}
                  className={
                    "/dashboard" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
              <Link to="/e-commerce/products">
                <Sidebar.Item
                  icon={HiShoppingBag}
                  className={
                    "/e-commerce/products" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Product
                </Sidebar.Item>
              </Link>
              <Link to="/users/list">
                <Sidebar.Item
                  icon={HiUsers}
                  className={
                    "/users/list" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  User List
                </Sidebar.Item>
              </Link>
              <Link to="/users/invoice">
              <Sidebar.Item  icon={FaFileInvoiceDollar} className={
                    "/users/invoice" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }>
                Invoices
              </Sidebar.Item>
              </Link>
             
              <Sidebar.Item
              icon={MdLoyalty}
             
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Loyalty
              {dropdownOpen && (
                <ul>
                <Sidebar.Item><Link to="/e-commerce/voucher"> Voucher </Link></Sidebar.Item>
                <Sidebar.Item><Link to="/e-commerce/reward">Reward</Link></Sidebar.Item>
                </ul>
              )}
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
