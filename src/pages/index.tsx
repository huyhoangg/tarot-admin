/* eslint-disable jsx-a11y/anchor-is-valid */
import { Badge, Dropdown, Table, useTheme, Card } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import axios from "axios";

const DashboardPage: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="px-4 pt-6">
        <div className="flex justify-between">
          <OrderCard />
          <RevenueCard />
          <UserCountCard />
        </div>
        <SalesThisWeek />
        <div className="my-6">
          <LatestTransactions />
        </div>
        <LatestCustomers />
        <div className="my-6">
          <AcquisitionOverview />
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};
interface RevenueData {
  date: string;
  total: number;
}

interface Intervals {
  interval: String;
  setInterval: React.Dispatch<React.SetStateAction<String>>;
}

const SalesThisWeek: FC = function () {
  const [data, setData] = useState<RevenueData[] | null>(null);
  const [interval, setInterval] = useState<String>("week");

  useEffect(() => {
    async function fetchRevenue() {
      try {
        const response = await axios.get(`/v1/admin/income/${interval}`);
        console.log(response.data);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchRevenue();
  }, [interval]);

  useEffect(() => {
    console.log(interval);
  }, [interval]);

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="shrink-0">
          <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
            {data &&
              data
                .reduce((acc, day) => acc + day.total, 0)
                .toLocaleString("vi-VN")}{" "}
            VND
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
            Sales this {interval}
          </h3>
        </div>
      </div>
      <SalesChart data={data} />
      <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <Datepicker interval={interval} setInterval={setInterval} />
      </div>
    </div>
  );
};

interface SalesChartProps {
  data: RevenueData[] | null;
}

const SalesChart: FC<SalesChartProps> = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  const { mode } = useTheme();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
  const opacityFrom = isDarkTheme ? 0 : 1;
  const opacityTo = isDarkTheme ? 0 : 1;

  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "smooth",
    },
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom,
        opacityTo,
        type: "vertical",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
    grid: {
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    markers: {
      size: 5,
      strokeColors: "#ffffff",
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: data.map((day) => day.date),
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: function (value) {
          return value.toLocaleString("vi-VN");
        },
      },
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };
  const revenueData = data.map((day) => day.total);
  const series = [
    {
      name: "Revenue",
      data: revenueData,
      color: "#1A56DB",
    },
  ];

  return <Chart height={420} options={options} series={series} type="area" />;
};

const Datepicker: FC<Intervals> = ({ interval, setInterval }) => {
  return (
    <span className="text-sm text-gray-600">
      <Dropdown
        inline
        label={
          interval == "week"
            ? "Tuần này"
            : interval == "month"
            ? "Tháng này"
            : "Năm này"
        }
      >
        <Dropdown.Item
          onClick={() => {
            setInterval("week");
          }}
        >
          Tuần này
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            setInterval("month");
          }}
        >
          Tháng này
        </Dropdown.Item>
      </Dropdown>
    </span>
  );
};

const LatestCustomers: FC = function () {
  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h3>
        <a
          href="#"
          className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/images/users/neil-sims.png"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Neil Sims
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $320
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/images/users/bonnie-green.png"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Bonnie Green
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $3467
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/images/users/michael-gough.png"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Michael Gough
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $67
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/images/users/thomas-lean.png"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Thomes Lean
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $2367
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/images/users/lana-byrd.png"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Lana Byrd
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  email@flowbite.com
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                $367
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <Datepicker />
      </div>
    </div>
  );
};

const AcquisitionOverview: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <h3 className="mb-6 text-xl font-bold leading-none text-gray-900 dark:text-white">
        Acquisition Overview
      </h3>
      <div className="flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table className="min-w-full table-fixed">
                <Table.Head>
                  <Table.HeadCell className="whitespace-nowrap rounded-l border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Top Channels
                  </Table.HeadCell>
                  <Table.HeadCell className="whitespace-nowrap border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Users
                  </Table.HeadCell>
                  <Table.HeadCell className="min-w-[140px] whitespace-nowrap rounded-r border-x-0 bg-gray-50 py-3 px-4 text-left align-middle text-xs font-semibold uppercase text-gray-700 dark:bg-gray-700 dark:text-white">
                    Acquisition
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-gray-100 dark:divide-gray-700">
                  <Table.Row className="text-gray-500 dark:text-gray-400">
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Organic Search
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      5,649
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">30%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-primary-700"
                              style={{ width: "30%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="text-gray-500 dark:text-gray-400">
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Referral
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      4,025
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">24%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-orange-300"
                              style={{ width: "24%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="text-gray-500 dark:text-gray-400">
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Direct
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      3,105
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">18%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-teal-400"
                              style={{ width: "18%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="text-gray-500 dark:text-gray-400">
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Social
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      1251
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">12%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-pink-600"
                              style={{ width: "12%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="text-gray-500 dark:text-gray-400">
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Other
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      734
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">9%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-indigo-600"
                              style={{ width: "9%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="text-gray-500 dark:text-gray-400">
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 text-left align-middle text-sm font-normal">
                      Email
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs font-medium text-gray-900 dark:text-white">
                      456
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border-t-0 p-4 align-middle text-xs">
                      <div className="flex items-center">
                        <span className="mr-2 text-xs font-medium">7%</span>
                        <div className="relative w-full">
                          <div className="h-2 w-full rounded-sm bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-sm bg-purple-500"
                              style={{ width: "7%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <Datepicker />
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Acquisition Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const OrderCard: FC = function () {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        const response = await axios.get(`/v1/admin/totalOrder`);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchRevenue();
  }, []);
  return (
    <Card className="min-w-[25rem] mb-6">
      <div className="flex items-center p-4 rounded-md shadow dark:bg-gray-900 ">
        <div className="mr-4">
          <span className="inline-block p-4 mr-2 text-blue-600 bg-blue-100 rounded-full dark:text-gray-400 dark:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="w-6 h-6 bi bi-bag-check"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              ></path>
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
            </svg>
          </span>
        </div>
        <div>
          <p className="mb-2 text-gray-700 dark:text-gray-400">
            Tổng số đơn hàng
          </p>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-400 text-center">
            {data && data.total}
          </h2>
        </div>
      </div>
    </Card>
  );
};

const RevenueCard: FC = function () {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        const response = await axios.get(`/v1/admin/income/year`);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchRevenue();
  }, []);
  return (
    <Card className="min-w-[25rem] mb-6">
      <div className="flex items-center p-4 rounded-md shadow dark:bg-gray-900 ">
        <div className="mr-4">
          <span className="inline-block p-4 mr-2 text-blue-600 bg-blue-100 rounded-full dark:text-gray-400 dark:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="w-6 h-6 bi bi-currency-dollar"
              viewBox="0 0 16 16"
            >
              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"></path>
            </svg>
          </span>
        </div>
        <div>
          <p className="mb-2 text-gray-700 dark:text-gray-400">
            Doanh thu trong năm
          </p>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-400">
            {data && data.total.toLocaleString("vi-VN")} VND
          </h2>
        </div>
      </div>
    </Card>
  );
};

const UserCountCard: FC = function () {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        const response = await axios.get(`/v1/admin/totalUser`);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchRevenue();
  }, []);
  return (
    <Card className="min-w-[25rem] mb-6">
      <div className="flex items-center p-4 rounded-md shadow dark:bg-gray-900 ">
        <div className="mr-4">
          <span className="inline-block p-4 mr-2 text-blue-600 bg-blue-100 rounded-full dark:text-gray-400 dark:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="w-6 h-6 bi bi-people"
              viewBox="0 0 16 16"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
            </svg>
          </span>
        </div>
        <div>
          <p className="mb-2 text-gray-700 dark:text-gray-400">
            Tổng số khách hàng
          </p>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-400 text-center">
            {data && data.total}
          </h2>
        </div>
      </div>
    </Card>
  );
};

const LatestTransactions: FC = function () {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Latest Transactions
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            This is a list of latest transactions
          </span>
        </div>
        <div className="shrink-0">
          <a
            href="#"
            className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
          >
            View all
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table
                striped
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
              >
                <Table.Head className="bg-gray-50 dark:bg-gray-700">
                  <Table.HeadCell>Transaction</Table.HeadCell>
                  <Table.HeadCell>Date &amp; Time</Table.HeadCell>
                  <Table.HeadCell>Amount</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="bg-white dark:bg-gray-800">
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment from{" "}
                      <span className="font-semibold">Bonnie Green</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Apr 23, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $2300
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <Badge color="success">Completed</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment refund to{" "}
                      <span className="font-semibold">#00910</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Apr 23, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      -$670
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <Badge color="success">Completed</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment failed from{" "}
                      <span className="font-semibold">#087651</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Apr 18, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $234
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <Badge color="failure">Cancelled</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment from{" "}
                      <span className="font-semibold">Lana Byrd</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Apr 15, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $5000
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <span className="mr-2 rounded-md bg-purple-100 py-0.5 px-2.5 text-xs font-medium text-purple-800 dark:bg-purple-200">
                        In progress
                      </span>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment from{" "}
                      <span className="font-semibold">Jese Leos</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Apr 15, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $2300
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <Badge color="success">Completed</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment from{" "}
                      <span className="font-semibold">THEMESBERG LLC</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Apr 11, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $560
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <Badge color="success">Completed</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment from{" "}
                      <span className="font-semibold">Lana Lysle</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Apr 6, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $1437
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <Badge color="success">Completed</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment to{" "}
                      <span className="font-semibold">Joseph Mcfall</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Apr 1, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $980
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <Badge color="success">Completed</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment from{" "}
                      <span className="font-semibold">Alphabet LLC</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Mar 23, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $11,436
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <span className="mr-2 rounded-md bg-purple-100 py-0.5 px-2.5 text-xs font-medium text-purple-800 dark:bg-purple-200">
                        In progress
                      </span>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      Payment from{" "}
                      <span className="font-semibold">Bonnie Green</span>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Mar 23, 2021
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                      $560
                    </Table.Cell>
                    <Table.Cell className="flex whitespace-nowrap p-4">
                      <Badge color="success">Completed</Badge>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 sm:pt-6">
        <Datepicker />
        <div className="shrink-0">
          <a
            href="#"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Transactions Report
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
