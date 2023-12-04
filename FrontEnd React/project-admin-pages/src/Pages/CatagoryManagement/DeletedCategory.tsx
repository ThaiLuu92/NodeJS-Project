import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  deleteAllDataByCondition,
  deleteData,
  getData,
  restoreData,
} from "../../apis/API";
import { I_Category } from "../../types/form.type";
import DeletedCategoryModal from "./DeletedCategoryModal";

function DeletedCategory() {
  const [catagorys, setCatagorys] = useState<I_Category[]>([]);
  const [selectedCatagory, setSelectedCatagory] = useState<I_Category | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã khóa học",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên danh mục",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Hành động",
      flex: 1.5,
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
            Xem
          </Button>

          <Button
            onClick={() => handleRestoreCategory(params.row.id)}
            variant="contained"
            color="primary"
            style={{
              marginLeft: 5,
              cursor: "pointer",
            }}
          >
            Khôi phục
          </Button>
          <Button
            onClick={() => handleDeleteCategory(params.row.id)}
            variant="contained"
            color="secondary"
            style={{
              marginLeft: 5,
              cursor: "pointer",
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCatagorys();
  }, []);

  async function fetchCatagorys() {
    const getCatagory = await getData("category/trash");
    setCatagorys(getCatagory);
  }

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedCatagory(null);
  };

  const handleViewDetails = (id: string) => {
    const catagory = catagorys.find((catagory) => catagory.id === id);
    if (catagory) {
      setSelectedCatagory(catagory);
      setModalOpen(true);
    }
  };

  const handleRestoreCategory = async (id: string) => {
    await restoreData("category/restore", id);
    fetchCatagorys();
  };
  const handleDeleteCategory = async (id: string) => {
    const confirmation = window.confirm(
      "Bạn có chắc là  muốn xóa  vĩnh viễn không ?"
    );

    if (confirmation) {
      await deleteData("category/del-forever", id);
      fetchCatagorys();
    }
  };

  const handleDeleteAllDeletedCategory = async () => {
    const confirmation = window.confirm(
      "Bạn có chắc là  muốn xóa vĩnh viễn tất cả không ?"
    );
    if (confirmation) {
      await deleteAllDataByCondition("category/delele-all");
      fetchCatagorys();
    }
  };
  return (
    <div>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginRight: "30px",
          }}
        >
          <h3 style={{ boxSizing: "border-box" }}>Các danh mục đã xóa</h3>{" "}
          <Button
            onClick={() => handleDeleteAllDeletedCategory()}
            variant="contained"
            color="error"
            style={{
              marginLeft: 5,
              cursor: "pointer",
            }}
          >
            Xóa Hết
          </Button>
        </div>

        <DataGrid
          className="disabled-focus"
          rows={catagorys}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
        />
      </>
      <DeletedCategoryModal
        catagory={selectedCatagory}
        open={isModalOpen}
        onClose={hanldeClose}
      />
    </div>
  );
}

export default DeletedCategory;
