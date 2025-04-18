"use client";

import { useAllUsersQuery } from "@/src/redux/features/user/userApi";
import { TUser } from "@/src/types/user";
import { Avatar } from "@heroui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import EditUser from "./_component/EditUser";

const UserManagement = () => {
  const { data: users } = useAllUsersQuery("");

  return (
    <div>
      <h2>users</h2>
      <Table fullWidth aria-label="Product Table">
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>E-mail</TableColumn>
          <TableColumn>Phone</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {users?.data?.map((user: TUser) => (
            <TableRow key={user._id}>
              <TableCell>
                <Avatar
                  className="cursor-pointer"
                  name="images"
                  src={user?.profileImg || ""}
                />
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.phone}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell className="flex gap-2">
                <EditUser user={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
