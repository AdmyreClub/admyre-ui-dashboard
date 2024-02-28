'use client';

import {ColumnDef} from '@tanstack/react-table'
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';

export type User = {
    id: string;
    name: String;
    email: string;
    image: string;
    lastSeen: string;
}

export type Profile = {
  id: string;
  name: string;
  profileImage: {
    url: string;
  };
  socialHandles: Array<{
    handle: string;
    metrics: {
      followers: number;
      avgEngagement: number;
    };
  }>;
}

export const columns: ColumnDef<Profile>[] = [
  {
    // New column for Profile Image
    accessorFn: (row) => row.profileImage?.url,
    id: 'profileImage',
    header: ' ',
    cell: (info) => {
      const imageUrl = info.getValue();
      if (typeof imageUrl === 'string') {
        return (
          <div style={{ width: '50px', height: '50px', position: 'relative' }}>
            <img src={imageUrl} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%'}}/>
          </div>
        );
      }
      return 'No Image';
    },
  },
  {
      accessorKey: 'name',
      header: 'Full Name',
  },
  {
    accessorFn: (row) => row.socialHandles[0]?.handle || 'N/A',
    id: 'username',
    header: 'Username',
  },
  {
    accessorFn: (row) => row.socialHandles[0]?.metrics.followers.toLocaleString() || '0',
    id: 'followers',
    header: 'Followers',
},
{
    accessorFn: (row) => (row.socialHandles[0]?.metrics.avgEngagement).toFixed(2) + '%',
    id: 'avgEngagement',
    header: 'Engagement Rate',
},
  {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(user.id)}
              >
                Refresh
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Save Profile</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]

// export const columnsOld: ColumnDef<User>[] = [
//     {
//         accessorKey: 'name',
//         header: 'Name',
//     },
//     {
//         accessorKey: 'email',
//         header: 'Email',
//     },
//     {
//         accessorKey: 'lastSeen',
//         header: 'Last Seen',
//         cell: ({ row }) => {
//             const date = new Date(row.getValue('lastSeen'));
//             const formattedDate = date.toLocaleDateString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 year: 'numeric',
//             });
//             return <span>{formattedDate}</span>;
//         }
//     },
//     {
//         id: "actions",
//         cell: ({ row }) => {
//           const user = row.original

//           return (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="h-8 w-8 p-0">
//                   <span className="sr-only">Open menu</span>
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                 <DropdownMenuItem
//                   onClick={() => navigator.clipboard.writeText(user.id)}
//                 >
//                   Copy payment ID
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>View customer</DropdownMenuItem>
//                 <DropdownMenuItem>View payment details</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )
//         },
//       },
// ]
