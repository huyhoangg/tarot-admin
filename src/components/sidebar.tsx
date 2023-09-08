import { Sidebar, TextInput, Select, Dropdown } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiOutlineBookmarkAlt,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";

import {FaFileInvoiceDollar,FaGifts} from "react-icons/fa"
import {MdLoyalty} from "react-icons/md"
import { Link } from "react-router-dom";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);
  const [isOpen, setIsOpen] = useState(false);
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
              <Link to="/e-commerce/categories">
                <Sidebar.Item
                  icon={HiOutlineBookmarkAlt}
                  className={
                    "/e-commerce/categories" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Categories
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
                <Sidebar.Item
                  icon={FaFileInvoiceDollar}
                  className={
                    "/users/invoice" === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  Invoices
                </Sidebar.Item>
              </Link>

              <Sidebar.Item icon={MdLoyalty}>
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="w-[100%] text-gray font-medium rounded-lg text-[16px] text-center inline-flex items-center"
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Loyalty
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div style={{ position: "absolute" }}>
                    <div
                      id="dropdown"
                      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul
                        className="text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li className="pt-2 hover:bg-gray-200 ">
                          <Link
                            to="/e-commerce/voucher"
                            className="mb-2 px-2 block w-[100%] "
                          >
                            Voucher
                          </Link>
                        </li>
                        <li className=" hover:bg-gray-200">
                          <Link
                            to="/e-commerce/reward"
                            className="px-2 pb-2 block w-[100%] "
                          >
                            Reward
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
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
