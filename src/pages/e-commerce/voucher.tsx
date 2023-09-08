/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Card,
} from "flowbite-react";
import type { FC } from "react";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiTrash,
  HiUpload,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import axios from "axios";

const VoucherPage: FC = function () {
  const [productDisplay, setProductDisplay] = useState<any | null>(null);
  const [vouchers, setVouchers] = useState<any | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    async function fetchVouchers() {
      try {
        const response = await axios.get(`/v1/admin/adminVoucher`);
        setVouchers(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchVouchers();
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
              <Breadcrumb.Item>Voucher</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All vouchers
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-[745px] ">
        <Card className="w-[400px] ">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p>Voucher details</p>
          </h5>

          {/* Add the dropdown here */}
          <Select onChange={(e) => setSelectedItem(e.target.value)}>
            <option value="">Select voucher</option>
            {vouchers?.map((voucher) => (
              <option value={voucher}>{voucher.title}</option>
            ))}
          </Select>

          {/* Only show the inputs if an item is selected */}
          {selectedItem && (
            <>
              <div>
                <Label htmlFor="total">Voucher Name</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder=""
                  value={selectedItem.title}
                  // onChange={(e) => setVoucherName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="point">Total Point</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder=""
                  // value={voucherPoint}
                  // onChange={(e) => setVoucherPoint(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="Expired">Short Code</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder=""
                  // value={voucherCode}
                  // onChange={(e) => setVoucherCode(e.target.value)}
                />
              </div>
              <div>
                <p>Voucher Image</p>
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
                <p>Edit voucher</p>
              </Button>
            </>
          )}
        </Card>
      </div>
    </NavbarSidebarLayout>
  );
};

const AddProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Add voucher
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add voucher</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="total">Voucher Name</Label>
                <TextInput id="brand" name="brand" placeholder="" />
              </div>
              <div>
                <Label htmlFor="status">Total Point</Label>
                <TextInput id="brand" name="brand" placeholder="" />
              </div>
              <div className="col-span-2">
                <Label htmlFor="point">Short Code</Label>
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
              Add voucher
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VoucherPage;
