/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
  Select,
  Textarea,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiPencilAlt,
  HiOutlineBadgeCheck,
  HiTrash,
} from "react-icons/hi";
import { GrDeliver } from "react-icons/gr";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import axios from "axios";

const UserInvoicePage: FC = function () {
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
              <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
              <Breadcrumb.Item>Invoice</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All invoices
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <AllUsersTable />
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </NavbarSidebarLayout>
  );
};

const EditProductModal: FC<any> = function ({ order }) {
  const [isOpen, setOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState(order);

  useEffect(() => {
    if (isOpen) {
      const productStrings = order.products
        .map((ord) => {
          return `${ord.productId.name} (${
            ord.productId._id
          }) - Price: ${ord.productId.price.toLocaleString("vi-vn")} x ${
            ord.quantity
          }`;
        })
        .join("\n");
      setOrderInfo((prev) => ({ ...prev, products: productStrings }));
    }
  }, [isOpen]);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 text-lg" />
        Detail
      </Button>
      <Modal
        onClose={() => {
          setOpen(false);
        }}
        show={isOpen}
      >
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Invoice Details </strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="">
                <Label htmlFor="category">Customer Phone</Label>
                <TextInput
                  id="invoiceName"
                  name="invoiceName"
                  className="mt-1"
                  value={orderInfo.cusId.phone}
                />
              </div>
              <div>
                <Label htmlFor="loyalty">Customer Name</Label>
                <TextInput
                  id="countries"
                  className="mt-1"
                  placeholder=""
                  value={`${order.cusId.firstName} ${order.cusId.lastName}`}
                ></TextInput>
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="productDetails">Order details</Label>
                <Textarea
                  id="productDetails"
                  name="productDetails"
                  placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
                  rows={6}
                  className="mt-1"
                  value={orderInfo.products}
                />
              </div>
              <div>
                <Label htmlFor="loyalty">Date Paid</Label>
                <TextInput
                  id="countries"
                  className="mt-1"
                  placeholder=""
                  value={orderInfo.dueDate.split("T")[0]}
                ></TextInput>
              </div>

              <div>
                <Label htmlFor="point">Point received</Label>
                <TextInput
                  id="invoiceName"
                  name="invoiceName"
                  className="mt-1"
                  value={orderInfo.total.toString().slice(0, -3)}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="price">Address</Label>
                <TextInput
                  id="price"
                  name="price"
                  placeholder=""
                  className="mt-1"
                  value={orderInfo.cusId.address}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-between">
            <Button
              color="primary"
              onClick={() => setOpen(!isOpen)}
              className=""
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeliveryInvoice: FC<any> = function ({ order }) {
  const [isOpen, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      console.log(order._id);
      await axios.post(`/v1/admin/setDelivery/${order._id}`);

      console.log("delivery ok");
    } catch (error) {
      console.error("Error delivery product:", error);
    }
  };

  return (
    <>
      <Button
        className="bg-orange-500 hover:bg-orange-600"
        onClick={() => setOpen(!isOpen)}
      >
        <GrDeliver className="mr-2 text-lg" />
        Delivery
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Delete product</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineBadgeCheck className="text-7xl text-orange-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Do you want to deliver ?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
              <Button
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  handleConfirm();
                  setOpen(false);
                }}
              >
                Yes, I'm sure
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const AllUsersTable: FC = function () {
  const [orders, setOrders] = useState<any | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axios.get(`/v1/admin/upcomingOrder`);
        setOrders(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchOrder();
  }, []);

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
        </Table.HeadCell>
        <Table.HeadCell>Order ID</Table.HeadCell>
        <Table.HeadCell>Payment Info</Table.HeadCell>
        <Table.HeadCell>Total</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {orders?.map((order) => (
          <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="w-4 p-4"></Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {order._id}
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              {order.paymentInfo.vnp_CardType}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-bold text-red-600 dark:text-white">
              {order.total.toLocaleString("vi-vn")} VND
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 gap-4 text-base font-normal text-gray-900 dark:text-white flex">
              <EditProductModal order={order} />
              <DeliveryInvoice order={order} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export const Pagination: FC = function () {
  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <a
          href="#"
          className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </a>
        <a
          href="#"
          className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </a>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <HiChevronLeft className="mr-1 text-base" />
          Previous
        </a>
        <a
          href="#"
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Next
          <HiChevronRight className="ml-1 text-base" />
        </a>
      </div>
    </div>
  );
};

export default UserInvoicePage;
