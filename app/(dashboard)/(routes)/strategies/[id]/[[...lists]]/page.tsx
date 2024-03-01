"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Strategy } from "@prisma/client";
import {
  ArrowLeft,
  ArrowRight,
  Delete,
  DeleteIcon,
  FileWarning,
  LucideDelete,
  Plus,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import GlobalFilter from "../../../actions/strategies/GlobalFilter";
import { Column, useGlobalFilter, usePagination, useTable } from "react-table";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import NewStrategyUI from "@/components/form.list.ui";
import { SkeletonDemo } from "@/components/SkeletonDemo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { array } from "zod";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/router";
import NewListUI from "@/components/new.list.ui";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
let influencers = [
  { name: "List 1", influencerCount: 13 },
  { name: "List 2", influencerCount: 32 },
  { name: "List 3", influencerCount: 33 },
  { name: "List 4", influencerCount: 23 },
  { name: "List 5", influencerCount: 16 },
  { name: "List 6", influencerCount: 18 },
  { name: "List 7", influencerCount: 20 },
  { name: "List 8", influencerCount: 23 },
  { name: "List 9", influencerCount: 81 },
  { name: "List 10", influencerCount: 9 },
];
type Checked = DropdownMenuCheckboxItemProps["checked"];
interface InputValues {
  inputValue: string;
}
const strategySchema = z.object({
  strategyName: z.string().min(1, "Please enter the strategy name"),
  addInfluencersBy: z.enum(["search", "manual"]),
  description: z.string().optional(),
});
type StrategyFormData = z.infer<typeof strategySchema>;
const page = () => {
  const { userId } = useAuth();
  const [lists, setLists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewListDialogOpen, setIsNewListDialogOpen] = useState(false);
  const [createListValue, setCreateListValue] = useState<string>("");
  const [currentStrategyId, setCurrentStrategyId] = useState<string | null>(
    null
  );

  const methods = useForm<StrategyFormData>({
    resolver: zodResolver(strategySchema),
  });

  useEffect(() => {
    const fetchLists = async () => {
      const pathSegments = window.location.pathname.split("/");
      const strategyIndex = pathSegments.indexOf("strategies");
      if (strategyIndex !== -1 && strategyIndex + 1 < pathSegments.length) {
        var strategyValue = pathSegments[strategyIndex + 1];
      } else {
        var strategyValue = "undefineds";
      }
      const strategyId = strategyValue;
      if (userId) {
        console.log(`Attempting to fetch lists for strategy ID: ${strategyId}`); // Additional log
        setIsLoading(true);
        try {
          // Note the change in the URL structure here: we use a query parameter `q` instead of a dynamic segment in the path.
          const response = await axios.get(
            `/api/strategy/lists?q=${strategyId}`
          );
          console.log("Lists fetched:", response.data); // Additional log
          setLists(response.data);
          setCurrentStrategyId(strategyId);
        } catch (error) {
          console.error("Error fetching lists:", error);
          if (axios.isAxiosError(error)) {
            console.error(
              "Error details:",
              error.response?.data || error.message
            ); // Additional log
          }
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchLists();
  }, []);

  const handleCreateListSubmit = async (listName: string) => {
    console.log("hit add");

    if (currentStrategyId) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `/api/strategy/lists/create?q=${currentStrategyId}`,
          {
            name: listName,
          }
        );
        console.log("New List Response:", response.data);
        setLists((current: any) => [...current, response.data]);
        setIsNewListDialogOpen(false); // Close the dialog
      } catch (error) {
        console.error("Error creating list:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("No strategy selected for the new list");
    }
  };

  const listCount = influencers.length;

  const [countStatus, setCountStatus] = useState<boolean>(
    listCount === 0 ? false : true
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value, cell }) => {
          console.log(cell.row.original.id);
          const [inputs, setInputs] = useState(
            [lists.map(() => { inputValue: "" })]
          );

          const handleInputChange = (
            index: number,
            field: keyof InputValues,
            value: string
          ) => {
            console.log(index, field, value);

            const newInputs = [...inputs];
            newInputs[index][`${field}`] = value;
            setInputs(newInputs);
          };

          const handleEditList = async (
            listNewName: string,
            listId: string
          ) => {
            try {
              const response = await axios.post(
                `/api/strategy/lists/update?listId=${listId}&name=${listNewName}`
              );
              console.log("New List Response:", response.data);

              setIsNewListDialogOpen(false); // Close the dialog
            } catch (error) {
              console.error("Error creating list:", error);
            }
          };

          return (
            <>
              <Input
                type="text"
                value={inputs[cell.row.id]?.inputValue || value}
                onChange={(e) =>
                  handleInputChange(cell.row.id, "inputValue", e.target.value)
                }
                placeholder="Input Value"
              />
              <Button
                onClick={() =>
                  handleEditList(
                    "khelan",
                    cell.row.original.id
                  )
                }
                className="mt-3"
              >
                Save
              </Button>
            </>
          );
        }, // property name in your strategy object
      },
      {
        Header: "No. of influencers",
        accessor: "profiles",
        Cell: ({ value }) => {
          return <>{value.length}</>;
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable({ columns, data: lists }, useGlobalFilter, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;

  function getIdByName(id) {
    for (const itemName in lists) {
      if (lists[itemName].id === id) {
        return lists[itemName].profiles.length;
      }
    }
    // Return a default value or handle the case when the name is not found
    return null;
  }

  return (
    <Card className="self-center shadow-none border-none outline-none flex flex-col mt-[10vh] w-[80vw] h-[70vh] ">
      {/* content */}
      <Card className="self-center h-[70vh] align-center mt-2 border-none shadow-none">
        {!countStatus ? (
          <Card
            className="flex  flex-col p-3 text-center border-none justify-center"
            style={{ borderStyle: "none" }}
          >
            <FileWarning size={36} className="self-center" />
            <p className="mt-2 ">No list exists, create one</p>
            <Button className="mt-2">
              Create List <Plus className="ml-1" />
            </Button>
          </Card>
        ) : (
          <>
            {influencers.length > 0 ? (
              <div className=" w-[80%] self-center justify-center">
                <div className=" self-center mt-4 ">
                  <div className="mb-4">
                    <GlobalFilter
                      placeholder={"Search Lists"}
                      filter={globalFilter}
                      setFilter={setGlobalFilter}
                    />
                  </div>
                  <table
                    {...getTableProps()}
                    style={{ borderCollapse: "collapse", width: "100%" }}
                  >
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr
                          {...headerGroup.getHeaderGroupProps()}
                          key={headerGroup.id}
                        >
                          {headerGroup.headers.map((column) => (
                            <th
                              {...column.getHeaderProps()}
                              className="border-b-2"
                              key={column.id}
                            >
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                              <td
                                {...cell.getCellProps()}
                                className="text-center border-b-2 p-2"
                                key={cell.id}
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="flex justify-center p-3">
                    <Button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      <ArrowLeft />
                    </Button>{" "}
                    <Button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                      className="ml-3"
                    >
                      Previous
                    </Button>{" "}
                    <Button
                      className="mx-3"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      Next
                    </Button>{" "}
                    <Button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                      className="mr-3"
                    >
                      <ArrowRight />
                    </Button>{" "}
                    <span className="self-center">
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{" "}
                    </span>
                    <span className="ml-3 mr-3">
                      | Go to page:{" "}
                      <Input
                        type="number"
                        defaultValue={pageIndex + 1}
                        min={1}
                        className="w-[300px] inline"
                        max={pageCount}
                        onChange={(e) => {
                          const pageNumber = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                          gotoPage(pageNumber);
                        }}
                        style={{ width: "60px" }}
                      />
                    </span>{" "}
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                      {[5, 10, 15].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <Dialog
              open={isNewListDialogOpen}
              onOpenChange={setIsNewListDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setIsNewListDialogOpen(true)}>
                  Create New List
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[512px]">
                <DialogHeader>
                  <DialogTitle>Create New List</DialogTitle>
                </DialogHeader>
                <FormProvider {...methods}>
                  {/* Assume NewListUI is a component similar to NewStrategyUI for list creation */}
                  <Card className="flex flex-col">
                    <Input
                      onChange={(e) => setCreateListValue(e.target.value)}
                      value={createListValue}
                    />
                    <Button
                      onClick={() => handleCreateListSubmit(createListValue)}
                      className="self-start mt-3"
                    >
                      Add
                    </Button>
                  </Card>
                </FormProvider>
              </DialogContent>
            </Dialog>
          </>
        )}
      </Card>
    </Card>
  );
};

export default page;
