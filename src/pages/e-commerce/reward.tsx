/* eslint-disable jsx-a11y/anchor-is-valid */
'use client';
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
    Card
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
  
  
  const RewardPage: FC = function () {
    const [productDisplay, setProductDisplay] = useState<any | null>(null);
    const [products, setProducts] = useState<any | null>(null);
    const [rewardName, setRewardName] = useState('');
    const [rewardStatus, setRewardStatus] = useState('');
    const [ordersPoint, setOrdersPoint] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const handleSelect = (value) => {
    setRewardName('');
    setRewardStatus('');
    setOrdersPoint('');
    setExpiredDate('');
    setSelectedItem(value);
    };
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
                <Breadcrumb.Item>rewards</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                All rewards
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
        <div className="flex items-center justify-center h-[745px]">
       
        <Card className="w-[400px] ">
  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    <p>Reward details</p>
  </h5>

  {/* Add the dropdown here */}
  <Select onChange={(e) => handleSelect(e.target.value)}>
    <option value="">Select reward</option>
    <option value="example1">Reward 1</option>
    <option value="example2">Reward 2</option>
  </Select>

  {/* Only show the inputs if an item is selected */}
  {selectedItem && (
    <>
      <div>
        <Label htmlFor="total">Reward Name</Label>
        <TextInput id="brand" name="brand" value={rewardName} placeholder=""   onChange={(e) => setRewardName(e.target.value)}/>
      </div>
      <div>
        <Label htmlFor="status">Reward Status</Label>
        <TextInput id="brand" name="brand" placeholder="" value={rewardStatus} onChange={(e) => setRewardStatus(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="point">Orders Point</Label>
        <TextInput id="brand" name="brand" placeholder=""value={ordersPoint} onChange={(e) => setOrdersPoint(e.target.value)}  />
      </div>
      <div>
        <Label htmlFor="Expired">Expired Date</Label>
        <TextInput id="brand" name="brand" placeholder=""value={expiredDate}  onChange={(e) => setExpiredDate(e.target.value) }/>
      </div>
      <div>
        <p>Reward Image</p>
        <Label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <HiUpload className="text-4xl text-gray-300" />
            <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
              Upload a file or drag and drop
            </p>
          </div>
          <input type="file" className="hidden" multiple />
        </Label>
      </div>

      <Button>
        <p>Edit Reward</p>
      </Button>
    </>
  )}
</Card>
</div>

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
          Add reward
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add reward</strong>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
        <Label htmlFor="total">Reward Name</Label>
        <TextInput id="brand" name="brand" placeholder="" />
      </div>
      <div>
        <Label htmlFor="status">Reward Status</Label>
        <TextInput id="brand" name="brand" placeholder=""/>
      </div>
      <div>
        <Label htmlFor="point">Orders Point</Label>
        <TextInput id="brand" name="brand" placeholder=""  />
      </div>
      <div>
        <Label htmlFor="Expired">Expired Date</Label>
        <TextInput id="brand" name="brand" placeholder="" />
      </div>
      
              </div>
              <div>
        <p className="my-2">Reward Image</p>
        <Label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <HiUpload className="text-4xl text-gray-300" />
            <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
              Upload a file or drag and drop
            </p>
          </div>
          <input type="file" className="hidden" multiple />
        </Label>
      </div>

            </form>
          </Modal.Body>
          <Modal.Footer>
          <div className="w-full flex justify-end">
            <Button color="primary" onClick={() => setOpen(false)}>
              Add reward
            </Button>
          </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
 
  
  export default RewardPage;
  