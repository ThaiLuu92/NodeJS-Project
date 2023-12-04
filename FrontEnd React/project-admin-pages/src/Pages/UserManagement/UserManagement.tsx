import React, { useState, useEffect } from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Box } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import {  I_User } from "../../types/form.type";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Switch, FormControlLabel } from "@mui/material";
import { Modal, Paper, Typography, TextField } from "@mui/material";
import { getData, searchData, updateData, updateDataByPatch } from "../../apis/API";
import { removeUnicode } from "../../Utils/RemoveUnicode";
import { useTheme } from "@mui/material/styles";

function UserManagement() {
  const theme = useTheme();
  const [users, setUsers] = useState<I_User[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<I_User | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalUser, setOriginalUser] = useState<I_User[]>([]); // Sao lưu danh sách users gốc

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user_name",
      headerName: "Username",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <FormControlLabel
            control={
              <Switch
                checked={params.value}
                onChange={() => handleToggleStatus(params.row.id)}
                name="status-toggle"
              />
            }
            label={params.value ? "Active" : "Blocked"}
          />
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => handleViewDetails(params.row.id)}
            variant="contained"
            style={{
              backgroundColor: "blue",
              color: "white",
              cursor: "pointer",
            }}
          >
            Xem thông tin
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const getUser = await getData("users");
    setUsers(getUser);
    setOriginalUser(getUser);
  }

  // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(value);
    try {
      setTimeout(async () => {
        const response = await searchData("users/search", { user_name: value });
        setUsers(response);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setUsers(originalUser); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };
  const handleToggleStatus = async (userId: string) => {
    try {
      const userToToggle = users.find((user) => user.id === userId);
      if (userToToggle) {
        const newStatus = !userToToggle.status;
        userToToggle.status = newStatus;
        await updateDataByPatch("users", userId, { status: newStatus });
        fetchUsers();
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };
  const handleViewDetails = (id: string) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setSelectedUser(user);
      setModalOpen(true);
    }
  };

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SlideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Quản lý học viên</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <TextField
              label="Tìm kiếm"
              value={searchTerm}
              onChange={handleSearch}
              variant="outlined"
              size="small"
            />
            <Button variant="contained" color="primary" onClick={handleClear}>
              Clear
            </Button>
          </div>
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              className="disabled-focus"
              rows={users}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 15]}
              components={{
                Toolbar: GridToolbar,
              }}
              // Responsive breakpoints
              sx={{
                [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                },
              }}
            />
          </div>
        </Box>
      </Box>
      <UserDetailsModal
        user={selectedUser}
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default UserManagement;

// UserDetailsModal.tsx
interface UserDetailsModalProps {
  user: I_User | null;
  open: boolean;
  onClose: () => void;
}
const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Thông tin người dùng
        </Typography>
        {user && (
          <Paper sx={{ p: 2 }}>
            <form>
            <div style={{ marginBottom: 10 }}>
                <label htmlFor="id">Mã ID</label>
                <input
                  type="text"
                  id="id"
                  value={user.id}
                  style={{ width: "100%", fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="user_name">Tên Học Viên</label>
                <input
                  type="text"
                  id="user_name"
                  value={user.user_name}
                  style={{ width: "100%", fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={user.email}
                  style={{ width: "100%", fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  value={user.phone}
                  style={{ width: "100%", fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  value={user.address}
                  style={{ width: "100%", fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="dob">Ngày tháng năm sinh</label>
                <input
                  type="text"
                  id="dob"
                  value={user.dob}
                  style={{ width: "100%", fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="level">Trình độ tiếng Nhật</label>
                <input
                  type="text"
                  id="level"
                  value={user.level}
                  style={{ width: "100%", fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
            </form>
          </Paper>
        )}
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={onClose}
        >
          Đóng
        </Button>
      </Box>
    </Modal>
  );
};
