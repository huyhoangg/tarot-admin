/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  Dropdown,
  Label,
  Modal,
  Select,
  Spinner,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
  HiOutlineArrowUp,
  HiUpload,
  HiX,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Pagination } from "../users/list";
import axios from "axios";

type Category = {
  _id: string;
  categoryName: string;
};

const EcommerceCategoryPage: FC = function () {
  const [allCategories, setAllCategories] = useState<Category | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`/v1/admin/allCategories/all`);
        setAllCategories(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchCategories();
  }, []);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/e-commerce/products">
                E-commerce
              </Breadcrumb.Item>
              <Breadcrumb.Item>Categories</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Categories
            </h1>
          </div>
          <div className="flex w-full items-center sm:justify-end">
            <AddProductModal />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <CategoriesTable allCategories={allCategories} />
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </NavbarSidebarLayout>
  );
};

const AddProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [catInfo, setCatInfo] = useState({
    categoryName: "",
    type: "Tarot",
  });

  const [errLog, setErrLog] = useState("");

  const handleAddCate = async (cat) => {
    try {
      const response = await axios.post("/v1/admin/addCategory/", {
        catInfo,
      });

      if (response.data === "created") {
        setErrLog(response.data);
      } else {
        setErrLog("error");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setErrLog("error");
    }
  };
  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 text-lg" />
        Add item
      </Button>
      <Modal
        onClose={() => {
          setCatInfo({
            categoryName: "",
            type: "Tarot",
          });
          setErrLog("");
          setOpen(false);
        }}
        show={isOpen}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add category</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="category name">Category name</Label>
                <TextInput
                  id="category name"
                  name="category name"
                  className="mt-1"
                  value={catInfo.categoryName}
                  onChange={(e) =>
                    setCatInfo((prev) => ({
                      ...prev,
                      categoryName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="Type">Type</Label>
                <Select
                  id="Type"
                  onChange={(e) =>
                    setCatInfo((prev) => ({ ...prev, type: e.target.value }))
                  }
                >
                  <option value={"Tarot"}>Tarot</option>
                  <option value={"Oracle"}>Oracle</option>
                </Select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => handleAddCate(catInfo)}>
            Create
          </Button>
          {errLog == "clicked" ? (
            <Spinner aria-label="Default status example" />
          ) : (
            <h1 className="text-red-400 text-sm">{errLog}</h1>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

const EditCategoryModal: FC<any> = function ({ cat }) {
  const [isOpen, setOpen] = useState(false);
  const [catInfo, setCatInfo] = useState(cat);
  const [errLog, setErrLog] = useState("");

  const handleUpdateCate = async (prod) => {
    try {
      const response = await axios.post("/v1/admin/updateCategory/", {
        catInfo,
      });

      if (response.data === "updated") {
        setErrLog(response.data);
      } else {
        setErrLog("error");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setErrLog("error");
    }
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 text-lg" />
        Edit item
      </Button>
      <Modal
        onClose={() => {
          setCatInfo(cat);
          setOpen(false);
        }}
        show={isOpen}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit category</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="category name">Category name</Label>
                <TextInput
                  id="category name"
                  name="category name"
                  className="mt-1"
                  value={catInfo.categoryName}
                  onChange={(e) =>
                    setCatInfo((prev) => ({
                      ...prev,
                      categoryName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="Type">Type</Label>
                <Select
                  id="Type"
                  value={catInfo.type}
                  onChange={(e) =>
                    setCatInfo((prev) => ({ ...prev, type: e.target.value }))
                  }
                >
                  <option value={"Tarot"}>Tarot</option>
                  <option value={"Oracle"}>Oracle</option>
                </Select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => handleUpdateCate(catInfo)}>
            Save all
          </Button>
          {errLog == "clicked" ? (
            <Spinner aria-label="Default status example" />
          ) : (
            <h1 className="text-red-400 text-sm">{errLog}</h1>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteCategoryModal: FC<any> = function ({ cat }) {
  const [isOpen, setOpen] = useState(false);
  const catId = cat._id;

  const handleDeleteProduct = async (catId) => {
    try {
      await axios.post(`/v1/admin/deleteCategory/${catId}`);

      console.log("deleted");
    } catch (error) {
      console.error("Error delete product:", error);
    }
  };
  return (
    <>
      <Button color="failure" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 text-lg" />
        Delete item
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Delete product</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this category?
            </p>
            <div className="flex items-center gap-x-3">
              <Button
                color="failure"
                onClick={() => {
                  handleDeleteProduct(catId);
                  setOpen(false);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const CategoriesTable: FC<Category> = function ({ allCategories }) {
  return (
    <Table
      striped
      className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
    >
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>Category Name</Table.HeadCell>
        <Table.HeadCell className="text-center">Type</Table.HeadCell>
        <Table.HeadCell className="text-center">Actions</Table.HeadCell>

      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {allCategories?.map((cat) => (
          <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400 w-1">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {cat.categoryName}
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-center text-pink-500 dark:text-white">
              {cat.type}
            </Table.Cell>

            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3 justify-center">
                <EditCategoryModal cat={cat} />
                <DeleteCategoryModal cat={cat} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EcommerceCategoryPage;
