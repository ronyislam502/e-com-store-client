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
import { useState } from "react";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useDebounce } from "@/src/utils/DebaounceHook";

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: users } = useAllUsersQuery({ search: debouncedSearch, role });

  return (
    <div>
      <div className="flex gap-4 mb-2">
        <Input
          className="max-w-xs"
          label="Search"
          size="md"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          className="max-w-xs"
          label="Role"
          size="md"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <SelectItem key="">All Roles</SelectItem>
          <SelectItem key="user">User</SelectItem>
          <SelectItem key="admin">Admin</SelectItem>
        </Select>
      </div>
      <div>
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
    </div>
  );
};

export default UserManagement;
