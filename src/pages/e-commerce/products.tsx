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
  HiUpload,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Pagination } from "../users/list";
import axios from "axios";

interface Products {
  products: any;
  setProducts: React.Dispatch<React.SetStateAction<any>>;
  productDisplay: any;
  setProductDisplay: React.Dispatch<React.SetStateAction<any>>;
}

const EcommerceProductsPage: FC = function () {
  const [productDisplay, setProductDisplay] = useState<any | null>(null);
  const [products, setProducts] = useState<any | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`/v1/admin/allProducts`);
        setProducts(response.data);
        setProductDisplay(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchProducts();
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
              <Breadcrumb.Item>Products</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All products
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchForProducts
              products={products}
              productDisplay={productDisplay}
              setProductDisplay={setProductDisplay}
              setProducts={setProducts}
            />
            <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Configure</span>
                <HiCog className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Delete</span>
                <HiTrash className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Purge</span>
                <HiExclamationCircle className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Settings</span>
                <HiDotsVertical className="text-2xl" />
              </a>
            </div>
            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable productDisplay={productDisplay} />
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </NavbarSidebarLayout>
  );
};

const SearchForProducts: FC<Products> = ({ setProductDisplay, products }) => {
  const handleSearch = (event) => {
    const searchKw = event.target.value.toLowerCase();
    const filter = products.filter((product) =>
      product.name.toLowerCase().includes(searchKw)
    );
    setProductDisplay(filter);
  };
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Search
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Search for products"
          onChange={handleSearch}
        />
      </div>
    </form>
  );
};

const AddProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Add product
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add product</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  placeholder='Apple iMac 27"'
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <TextInput
                  id="category"
                  name="category"
                  placeholder="Electronics"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Apple"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  name="price"
                  type="number"
                  placeholder="$2300"
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="producTable.Celletails">Product details</Label>
                <Textarea
                  id="producTable.Celletails"
                  name="producTable.Celletails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Add product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const EditProductModal: FC<any> = function ({ product }) {
  const [isOpen, setOpen] = useState(false);
  const [productInfo, setProductInfo] = useState(product);
  const [categories, setCategories] = useState(product.category);
  const [allCategories, setAllCategories] = useState<any>(null);
  const [errLog, setErrLog] = useState("");
  const [file, setFile] = useState([]);

  function handleFiles(e) {
    console.log(e.target.files);
    const files = e.target.files;
    setFile(Array.from(files));
    // setFile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    if (isOpen) {
      console.log(categories);
      async function fetchCategories() {
        try {
          const response = await axios.get(
            `/v1/admin/allCategories/${productInfo.type || "all"}`
          );
          console.log(response.data);
          setAllCategories(response.data);
        } catch (e) {
          console.log(e);
        }
      }
      fetchCategories();
    }
  }, [isOpen]);

  const handleAddCategory = (e) => {
    const chosenCat = allCategories[e.target.value];
    const found = categories.find((cat) => cat._id == chosenCat._id);
    if (!found) {
      setCategories((prev) => [...prev, chosenCat]);
    }
  };

  const uploadImagesToCloudinary = async (images) => {
    setErrLog("clicked");

    const uploadedUrls = [];

    // Loop through the selected images
    for (const image of images) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "kdbr5ygr");
      data.append("cloud_name", "difzzraqj");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/difzzraqj/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );
        const res = await response.json();
        console.log(res);
        uploadedUrls.push(res.secure_url);
      } catch (error) {
        console.error("Error uploading image: ", error);
        // Handle the error here
      }
    }

    // uploadedUrls will contain an array of uploaded image URLs
    return uploadedUrls;
  };

  const handleUpdateProduct = async (prod) => {
    try {
      const uploadedUrls = await uploadImagesToCloudinary(file);

      console.log("Uploaded URLs: ", uploadedUrls);

      const catIds = categories.map((cat) => cat._id);
      const updatedProductInfo = {
        ...prod,
        imageURLs: [...prod.imageURLs, ...uploadedUrls],
        category: catIds,
      };

      const response = await axios.post("/v1/admin/updateProduct/", {
        productInfo: updatedProductInfo,
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

  const handleRemoveImg = async (link) => {
    const updatedIds = productInfo.imageURLs.filter((id) => id !== link);
    setProductInfo((prev) => ({ ...prev, imageURLs: updatedIds }));
  };

  useEffect(() => {
    if (isOpen) {
      console.log("change:", categories);
    }
  }, [categories]);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 text-lg" />
        Edit item
      </Button>
      <Modal
        onClose={() => {
          setProductInfo(product);
          setCategories(product.category);
          setOpen(false);
        }}
        show={isOpen}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit product</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  name="productName"
                  className="mt-1"
                  value={productInfo.name}
                  onChange={(e) =>
                    setProductInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <div className="max-w-md" id="select">
                  <div className="mb-2 block">
                    <Label htmlFor="countries" />
                  </div>
                  <Select id="countries" required onChange={handleAddCategory}>
                    {allCategories?.map((cat, index) => (
                      <option value={index}>{cat.categoryName}</option>
                    ))}
                  </Select>
                  <div className="flex gap-1 flex-wrap">
                    {categories?.map((cat) => (
                      <Badge className="w-max" color="indigo">
                        {cat.categoryName}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="brand">Type</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder="Apple"
                  className="mt-1"
                  value={productInfo.type}
                  onChange={(e) =>
                    setProductInfo((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="price">Author</Label>
                <TextInput
                  id="price"
                  name="price"
                  placeholder="$2300"
                  className="mt-1"
                  value={productInfo.author}
                  onChange={(e) =>
                    setProductInfo((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="productDetails">Product details</Label>
                <Textarea
                  id="productDetails"
                  name="productDetails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                  value={productInfo.describe}
                  onChange={(e) =>
                    setProductInfo((prev) => ({
                      ...prev,
                      describe: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex justify-between">
                {productInfo.imageURLs.map((imglink) => (
                  <div>
                    <img
                      alt="Apple iMac 1"
                      src={imglink}
                      className="w-25 h-16 rounded-lg border  object-cover"
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() => handleRemoveImg(imglink)}
                    >
                      <span className="sr-only">Delete</span>
                      <HiTrash className="-mt-5 text-2xl text-red-600" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col-reverse">
                <h1>to upload : {file.length} files chosen</h1>
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Upload a file or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFiles}
                      multiple
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="primary"
            onClick={() => handleUpdateProduct(productInfo)}
          >
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

const DeleteProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

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
              Are you sure you want to delete this product?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => setOpen(false)}>
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

const ProductsTable: FC<Products> = function ({ productDisplay }) {
  return (
    <Table
      striped
      className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
    >
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>Product Name</Table.HeadCell>
        <Table.HeadCell>Type</Table.HeadCell>
        <Table.HeadCell>Stock</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {productDisplay?.map((product) => (
          <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400 w-1">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {product.name}
              </div>
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400 truncate w-[70%]">
                {product.category.map((cat, index) => (
                  <span key={index}>
                    {cat.categoryName}
                    {index === product.category.length - 1 ? "" : ", "}
                  </span>
                ))}
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {product.type}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-green-400 dark:text-white">
              {product.stock}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-bold text-red-500 dark:text-white">
              {product.price.toLocaleString("vi-VN")}
            </Table.Cell>
            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3">
                <EditProductModal product={product} />
                <DeleteProductModal />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EcommerceProductsPage;
