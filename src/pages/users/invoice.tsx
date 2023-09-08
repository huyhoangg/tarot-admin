/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
    Button,
    Checkbox,
    Label,
    Modal,
    Table,
    TextInput,
    Select
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
  import {GrDeliver} from "react-icons/gr"
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
  
  const AddUserModal: FC = function () {
    const [isOpen, setOpen] = useState(false);
  
    return (
      <>
        <Button color="primary" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-3">
            <HiPlus className="text-xl" />
            Add user
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen}>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Add new user</strong>
          </Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <div className="mt-1">
                  <TextInput
                    id="firstName"
                    name="firstName"
                    placeholder="Bonnie"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <div className="mt-1">
                  <TextInput id="lastName" name="lastName" placeholder="Green" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1">
                  <TextInput
                    id="email"
                    name="email"
                    placeholder="example@company.com"
                    type="email"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <div className="mt-1">
                  <TextInput
                    id="phone"
                    name="phone"
                    placeholder="e.g., +(12)3456 789"
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <div className="mt-1">
                  <TextInput
                    id="department"
                    name="department"
                    placeholder="Development"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <div className="mt-1">
                  <TextInput
                    id="company"
                    name="company"
                    placeholder="Somewhere"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={() => setOpen(false)}>
              Add user
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };


const EditProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

 return (
  <>
     <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiPencilAlt className="mr-2 text-lg"  />
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
            <div className="lg:col-span-2">
    <Label htmlFor="category">ID Invoice</Label>
    <TextInput id="invoiceName" name="invoiceName" className="mt-1" />
  </div>
             
              <div>
                <Label htmlFor="total">Total  </Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder=""
                  className="mt-1"
               
                />
                
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <TextInput id="countries" className="mt-1"  placeholder="">
                </TextInput>
              </div>
              <div>
                <Label htmlFor="loyalty">Loyalty</Label>
                <TextInput id="countries" className="mt-1"  placeholder="">
                  </TextInput>
              </div>
             
              <div>
                <Label htmlFor="point">Point received</Label>
                <TextInput
                  id="invoiceName"
                  name="invoiceName"
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="price">Date</Label>
                <TextInput
                  id="price"
                  name="price"
                  placeholder=""
                  className="mt-1"
                />
              </div>
        </div>
          </form>
        </Modal.Body>
        <Modal.Footer >
          <div className="w-full flex justify-between">

          <DeleteProductModal/>
          <Button color="primary" onClick={() => setOpen(!isOpen)} className="">
            Close
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
  </>
 )}

  


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
              Are you sure you want to delete this invoice?
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

}

const DeliveryInvoice: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const handleConfirm = () => {
    setOpen(false);
    setToastMessage("Delivery success !!! ");
    setTimeout(() => setToastMessage(null), 3000);
  };
  
  return (
    <>
      {toastMessage && (

        <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white p-2 rounded">
          {toastMessage}
        </div>
      )}
      <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setOpen(!isOpen)}>
        <GrDeliver className="mr-2 text-lg" />
       Delivery
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Delete product</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            < HiOutlineBadgeCheck className="text-7xl text-orange-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
            Do you want to deliver ? 
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleConfirm}>
                Yes, I'm sure
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

  
  const AllUsersTable: FC = function () {
    const [users, setUsers] = useState<any | null>(null);
  
    useEffect(() => {
      async function fetchUsers() {
        try {
          const response = await axios.get(`/v1/admin/allUser`);
          setUsers(response.data);
        } catch (e) {
          console.log(e);
        }
      }
      fetchUsers();
    }, []);
  
    return (
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>
            <Label htmlFor="select-all" className="sr-only">
              Select all
            </Label>
            <Checkbox id="select-all" name="select-all" />
          </Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell >Invoices</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {users?.map((user) => (
            <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Table.Cell className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-2"
                    aria-describedby="checkbox-1"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-4 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  />
                  <label htmlFor="checkbox-2" className="sr-only">
                    checkbox
                  </label>
                </div>
              </Table.Cell>
              <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/images/users/roberta-casas.png"
                  alt="Roberta Casas avatar"
                />
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {`${user.firstName} ${user.lastName}`}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {user.phone}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {user.address}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white flex">
                 <EditProductModal  />
                  <DeliveryInvoice/>
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
  