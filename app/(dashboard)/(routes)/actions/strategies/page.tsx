"use client";
import React, { useEffect, useRef, useState } from "react";
import NewStrategyUI from "@/components/form.list.ui";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Strategy } from "@prisma/client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/context/AuthContext";
import * as z from "zod";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useTable } from "react-table";
import classNames from "classnames";
const strategySchema = z.object({
  strategyName: z.string().min(1, "Please enter the strategy name"),
  addInfluencersBy: z.enum(["search", "manual"]),
  description: z.string().optional(),
});
type StrategyFormData = z.infer<typeof strategySchema>;
interface Strategy {
  id: number;
  url: string;
  listcount: number;
  createdAt: string;
}

interface StrategiesTableProps {
  strategies: Strategy[];
}

export default function StrategyUI() {
  const { userId } = useAuth();
  const { user } = useUser();
  const userName = user?.fullName;
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const { register, handleSubmit, reset, formState: { errors } } = useForm<StrategyFormData>({
  //   resolver: zodResolver(strategySchema),
  // });

  const router = useRouter();

  const methods = useForm<StrategyFormData>({
    resolver: zodResolver(strategySchema),
  });

  useEffect(() => {
    const fetchStrategies = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          const response = await fetch("/api/strategy/get-all");
          console.log("whats the response: ", response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const fetchedStrategies = await response.json();
          setStrategies(fetchedStrategies);
        } catch (error) {
          console.error("Error fetching strategies:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStrategies();
  }, []);

  const handleStrategySubmit = async (data: StrategyFormData) => {
    console.log("Strategy Data:", data);
    setIsDialogOpen(false);
    console.log("Form Data Submitted:", data); // First, log data to the console

    // Construct the strategy data object
    const strategyData = {
      name: data.strategyName,
      pictureUrl:
        "https://cdn.hypeauditor.com/img/instagram/user/13460080.jpg?w=100&till=1708507419&sign=be5247df95066c982795505571047925",
      description: data.description,
    };

    console.log("Strategy Data to Send:", strategyData); // Log the strategy data

    try {
      const response = await axios.post("/api/strategy/new", {
        name: data.strategyName,
        pictureUrl:
          "https://cdn.hypeauditor.com/img/instagram/user/13460080.jpg?w=100&till=1708507419&sign=be5247df95066c982795505571047925",
        description: data.description,
      });

      console.log("New Strategy Response:", response.data); // Log the response data

      setStrategies((current) => [...current, response.data]);
      setIsDialogOpen(false);
      methods.reset();

      // if (data.addInfluencersBy === 'search') {
      //   await router.push('/discover');
      // } else if (data.addInfluencersBy === 'manual') {
      //   await router.push('/actions/import');
      // }

      // Reload the current page
      //window.location.reload();
    } catch (error) {
      console.error("Error creating strategy");
      console.error(error);
    }
  };

  const formatCreatedAt = (dateString: string) => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
    return formattedDate;
  };

  const columns: Column<Strategy>[] = React.useMemo(
    () => [
      {
        
        accessor: "pictureUrl",
        Cell: ({ value }) => (
          <img
            src={value}
            alt="Strategy Image"
            style={{ maxWidth: "100%", maxHeight: "50px" }}
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name", // property name in your strategy object
      },
      {
        Header: "List Count",
        accessor: "listCount",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => formatCreatedAt(value),
      },
    ],
    []
  );

  // Create an instance of the useTable hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: strategies });

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <div>
        <div className="mb-8 space-y-4 pt-[3rem] ">
          <Card className="shadow-none border-none ">
            <CardHeader>
              <CardTitle className="ml-2 text-[23px] font-semibold">
                Strategies
              </CardTitle>
            </CardHeader>
            {/* unconventional but i needed to place footer above the content */}
            <CardFooter className="justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Strategy</DialogTitle>
                  </DialogHeader>
                  <FormProvider {...methods}>
                    <NewStrategyUI
                      onSubmit={handleStrategySubmit}
                      setIsDialogOpen={setIsDialogOpen}
                    />
                  </FormProvider>
                </DialogContent>
              </Dialog>
            </CardFooter>
            <CardContent className=" align-middle mt-[-30px]">
              <Card className="flex justify-end border-none shadow-none mb-5">
                <Button onClick={() => setIsDialogOpen(true)} className="">
                  New Strategy
                </Button>
              </Card>
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
                  {rows.map((row) => {
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
