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
  const [vouchers, setVouchers] = useState<any | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [voucherInfo, setVoucherInfo] = useState<any | null>(null);
  const [err, setErr] = useState<any | null>("");

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

  const handleEditVoucher = async (voucherinfo) => {
    try {
      await axios.post(`/v1/admin/updateVoucher/${voucherinfo._id}`, {
        voucherInfo: voucherinfo,
      });
      setErr("edited");
    } catch (error) {
      console.error("Error delivery product:", error);
    }
  };

  const handleRemove = async (voucherinfo) => {
    try {
      await axios.post(`/v1/admin/removeVoucher/${voucherinfo._id}`);
      setErr("removed");
    } catch (error) {
      console.error("Error delivery product:", error);
    }
  };

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

          <Select
            onChange={(e) => {
              setSelectedItem(e.target.value);
              setVoucherInfo(vouchers[e.target.value]);
            }}
          >
            <option value="">Select voucher</option>
            {vouchers?.map((voucher, index) => (
              <option value={index}>{voucher.title}</option>
            ))}
          </Select>

          {selectedItem && (
            <>
              <div>
                <Label htmlFor="total">Voucher Name</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder=""
                  value={voucherInfo?.title}
                  onChange={(e) =>
                    setVoucherInfo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="Value">Voucher Value</Label>
                <TextInput
                  id="Value"
                  name="Value"
                  placeholder=""
                  value={voucherInfo?.value}
                  onChange={(e) =>
                    setVoucherInfo((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="Point">Total Point</Label>
                <TextInput
                  id="Point"
                  name="Point"
                  placeholder=""
                  value={voucherInfo?.points}
                  onChange={(e) =>
                    setVoucherInfo((prev) => ({
                      ...prev,
                      points: e.target.value,
                    }))
                  }
                />
              </div>
              {err && <h1 className="text-red-400">{err}</h1>}
              <Button onClick={() => handleEditVoucher(voucherInfo)}>
                <p>Edit voucher</p>
              </Button>
              <Button color="failure" onClick={() => handleRemove(voucherInfo)}>
                <p>Remove voucher</p>
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
  const [err, setErr] = useState("");

  const [voucherInfo, setVoucherInfo] = useState<any | null>({
    title: "",
    value: 0.1,
    points: 100,
    image:
      "https://cdn.pixabay.com/photo/2020/03/02/18/23/coffee-4896485_1280.jpg",
  });

  const handleEditVoucher = async (voucherinfo) => {
    try {
      await axios.post(`/v1/admin/createVoucher`, {
        voucherInfo: voucherinfo,
      });
      setErr("created");
    } catch (error) {
      console.error("Error delivery product:", error);
    }
  };

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
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder=""
                  value={voucherInfo.title}
                  onChange={(e) =>
                    setVoucherInfo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="status">Total Point</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder=""
                  value={voucherInfo.points}
                  onChange={(e) =>
                    setVoucherInfo((prev) => ({
                      ...prev,
                      points: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="point">Value</Label>
                <TextInput
                  id="brand"
                  name="brand"
                  placeholder=""
                  value={voucherInfo.value}
                  onChange={(e) =>
                    setVoucherInfo((prev) => ({
                      ...prev,
                      value: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-full flex justify-between">
            {err && <h1 className="text-red-400 ">{err}</h1>}
            <Button
              color="primary"
              onClick={() => {
                handleEditVoucher(voucherInfo);
              }}
            >
              Add voucher
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VoucherPage;
