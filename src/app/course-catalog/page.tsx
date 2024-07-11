"use client"

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Card, 
  CardFooter,
  Image,
  CardHeader,
} from "@nextui-org/react";
import {PlusIcon} from "./PlusIcon";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {SearchIcon} from "./SearchIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {columns, fetchClasses, statusOptions} from "./data";
import {capitalize} from "./utils";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";


const INITIAL_VISIBLE_COLUMNS = ["name", "grades", "weighted", "actions"];



export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);

  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const fetchedClasses = await fetchClasses();
        setClasses(fetchedClasses);
        console.warn(fetchedClasses);
      } catch (err) {
        setError(err);
      }
    };

    loadClasses();
  }, []);

  const handlePress = () => {
    

  }

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = classes;

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      console.warn("HERE!!!!")
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.weight),
      );
    }

    return filteredUsers;
  }, [classes, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    console.log(user, columnKey);
    let newCellVal = ''
    switch (columnKey) {
      
      case "name":

      // (TODO )get a custom icon for each category

        return (
          <User
          avatarProps={user.id}
            // description={user.prereq}
            name={cellValue}
          >
            {user.weight}
          </User>
        );
      case "grades":
        if (cellValue.length > 1) {
          newCellVal = cellValue.join(", ");
        } else {
          newCellVal = cellValue;
        }
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{newCellVal}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.weight}</p>
          </div>
        );
      case "weighted":
        newCellVal = user['weight'] ? "Yes" : "No";
        return (
          <Chip className="capitalize" color="primary" size="sm" variant="flat">
            {newCellVal}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items- gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    console.warn("HERE");
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%] "
            placeholder="  Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Weighted
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">{classes.length} total classes offered</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    classes.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    console.warn("HERE TOO")
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Course Catalog" />
      <div className="gap-2 grid grid-cols-12 grid-rows-2 px-8 mb-15">

    <Card isPressable className="col-span-12 sm:col-span-4 h-[300px]" onPress={handlePress}>

      <CardHeader className="absolute z-10 bottom-1 flex-col !items-start pl-3">
        <h4 className="text-white font-bold text-2xl pl-3 ">Social Studies</h4>
      </CardHeader>

      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover opacity-1"
        src="../../images/homecards/classeshome.png"
      />

    </Card>
    <Card isPressable className="col-span-12 sm:col-span-4 h-[300px]" onPress={handlePress}>

      <CardHeader className="absolute z-10 bottom-1 flex-col !items-start pl-3">
        <h4 className="text-white font-bold text-2xl pl-3 ">English (ELA)</h4>
      </CardHeader>

      <Image
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover opacity-1"
        src="../../images/homecards/englishbook.png"
      />

    </Card>
    <Card isPressable className="col-span-12 sm:col-span-4 h-[300px]" onPress={handlePress}>

<CardHeader className="absolute z-10 bottom-1 flex-col !items-start pl-3">
  <h4 className="text-white font-bold text-2xl pl-3 ">Mathematics</h4>
</CardHeader>

<Image
  removeWrapper
  alt="Card background"
  className="z-0 w-full h-full object-cover opacity-1"
  src="../../images/homecards/mathcalc.png"
/>

</Card>
<Card isPressable className="col-span-12 sm:col-span-4 h-[300px]" onPress={handlePress}>

<CardHeader className="absolute z-10 bottom-1 flex-col !items-start pl-3">
  <h4 className="text-white font-bold text-2xl pl-3 ">Sciences</h4>
</CardHeader>

<Image
  removeWrapper
  alt="Card background"
  className="z-0 w-full h-full object-cover opacity-1"
  src="../../images/homecards/microscience.jpg"
/>

</Card>
<Card isPressable className="col-span-12 sm:col-span-4 h-[300px]" onPress={handlePress}>

<CardHeader className="absolute z-10 bottom-1 flex-col !items-start pl-3">
  <h4 className="text-white font-bold text-2xl pl-3 ">CTE/College Prep</h4>
</CardHeader>

<Image
  removeWrapper
  alt="Card background"
  className="z-0 w-full h-full object-cover opacity-1"
  src="../../images/homecards/diploma.png"
/>

</Card>
<Card isPressable className="col-span-12 sm:col-span-4 h-[300px]" onPress={handlePress}>

<CardHeader className="absolute z-10 bottom-1 flex-col !items-start pl-3">
  <h4 className="text-white font-bold text-2xl pl-3 ">VAPA/Electives</h4>
</CardHeader>

<Image
  removeWrapper
  alt="Card background"
  className="z-0 w-full h-full object-cover opacity-1"
  src="../../images/homecards/microphone.jpg"
/>

</Card>
    
  </div>
<div className={"p-5"} style={{backgroundColor: 'rgb(1, 1, 1)', borderRadius: '20px'}}>
    <Table
      isCompact
      aria-label="Table of Vista Classes"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="inside"
      classNames={{
        wrapper: "align-left w-full",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="inside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      style={{
        backgroundColor:'rgb(39,39,42)',
         borderRadius: '20px'
      }}
    >
      <TableHeader columns={headerColumns} >
        {(column) => (
          <TableColumn
            key={column.uid}
            align={"start"}
            allowsSorting={column.sortable}
            style={{ textAlign: 'left' }} // Inline style for additional enforcement
            className={"m-2"}

          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No classes found"} items={sortedItems} style={{borderRadius: "20px"}}>
        {(item) => {
          console.info("ITEM: ", item) 
          return(
          <TableRow key={item.id}>
            {(columnKey) => <TableCell className={"p-3"} style={{backgroundColor: "rgb(24, 24, 27)"}}>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}}
      </TableBody>
    </Table>
    </div>
    </DefaultLayout>
  );
}
