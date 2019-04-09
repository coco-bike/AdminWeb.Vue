<template>
  <div class="app-container">
    <div class="search-value">
      <span>
        菜单名称：
      </span>
      <el-input
        placeholder="请输入内容"
        v-model="menuName"
        clearable
        class="search-input"
      >
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="search-height"
        @click="loadTableData"
      >搜索</el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        class="search-height"
        @click="handleAdd"
      >添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        align="center"
        label="序号"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="ID"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.row.Id }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="菜单级别"
        width="95"
      >
        <template slot-scope="scope">
          {{ scope.row.ParentId==0?"顶级菜单": scope.row.ParentId}}
        </template>
      </el-table-column>
      <el-table-column
        prop="Title"
        label="菜单标题"
      ></el-table-column>
      <el-table-column
        prop="Name"
        label="菜单名称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="Path"
        label="菜单地址"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="Component"
        label="当前组件"
      ></el-table-column>
      <el-table-column
        prop="Redirect"
        label="重定向"
      ></el-table-column>
      <el-table-column
        prop="Icon"
        label="图标地址"
      ></el-table-column>
      <el-table-column label="隐藏">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Hidden | statusFilter">{{ scope.row.Hidden?'是':'否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="禁用">
        <template slot-scope="scope">
          <el-tag :type="scope.row.IsDeleted | statusFilter">{{ scope.row.IsDeleted?'是':'否' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="170"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <el-dialog
      title="编辑"
      :visible.sync="centerDialogVisible"
      width="50%"
      center
    >
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单标题">
              <el-input v-model="form.Title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单链接地址">
              <el-input v-model="form.Path"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="当前组件">
              <el-input v-model="form.Component"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重定向">
              <el-input v-model="form.Redirect"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单图标">
              <el-input v-model="form.Icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称">
              <el-input v-model="form.Name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单描述">
              <el-input v-model="form.Description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择父级菜单">
              <el-select
                v-model="form.ParentId"
                filterable
                placeholder="请选择"
                class="menu-width"
                @visible-change="selectClick"
              >
                <el-option
                  v-for="item in selectList"
                  :key="item.Id"
                  :label="item.Title"
                  :value="item.Id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否隐藏">
              <el-switch v-model="form.Hidden"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否禁用">
              <el-switch v-model="form.IsDeleted"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="savemenu"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  getPageList,
  getMenuByID,
  saveMenuData,
  addMenuData,
  deleteMenuData
} from "@/api/menu";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: "danger",
        false: "success"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      selectList: null,
      listLoading: true,
      currentPage: 1,
      totalCount: 1,
      pageSize: 5,
      centerDialogVisible: false,
      form: {
        ParentId: "",
        Name: "",
        Path: "",
        Icon: "",
        Component: "",
        Redirect: "",
        Title: "",
        OrderSort: 0,
        Description: "",
        Hidden: false,
        IsDeleted: false
      },
      menuName: "",
      isAdd: false
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.loadTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadTableData();
    },
    handleAdd() {
      this.centerDialogVisible = true;
      //清空数据
      Object.keys(this.form).forEach(s => {
        if (s == "Hidden" || s == "IsDeleted") {
          return (this.form[s] = false);
        } else if (s == "OrderSort") {
          return 0;
        } else {
          this.form[s] = "";
        }
      });
      this.isAdd = true;
    },
    handleEdit(rowindex, row) {
      this.centerDialogVisible = true;
      getMenuByID(row.Id).then(r => {
        if (r.Success) {
          this.form = r.Data;
          this.isAdd = false;
        }
      });
    },
    handleDelete(rowindex, row) {
      deleteMenuData(row.Id).then(r => {
        let msg = r.Success ? r.Msg : "菜单删除失败";
        let type = r.Success ? "success" : "error";
        this.$message({
          message: msg,
          type: type
        });
        if (r.Success) {
          this.centerDialogVisible = false;
        }
        this.loadTableData();
      });
    },
    loadTableData() {
      this.listLoading = true;
      getPageList(this.currentPage, this.pageSize).then(r => {
        if (r.Code == 1) {
          this.list = r.Data;
          this.totalCount = r.Count;
          this.listLoading = false;
        }
      });
    },
    savemenu() {
      if (this.isAdd) {
        addMenuData(this.form).then(r => {
          let msg = r.Success ? r.Msg : "菜单添加失败";
          let type = r.Success ? "success" : "error";
          this.$message({
            message: msg,
            type: type
          });
          if (r.Success) {
            this.centerDialogVisible = false;
          }
          this.loadTableData();
        });
      } else {
        saveMenuData(this.form).then(r => {
          let msg = r.Success ? r.Msg : "菜单更新失败";
          let type = r.Success ? "success" : "error";
          this.$message({
            message: msg,
            type: type
          });
          if (r.Success) {
            this.centerDialogVisible = false;
          }
          this.loadTableData();
        });
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    selectClick() {
      this.selectList = this.list.map(n => {
        return { Id: n.Id, Title: n.Title };
      });
      this.selectList.push({ Id: 0, Title: "顶级菜单" });
    }
  },
  mounted: function() {
    this.loadTableData();
  }
};
</script>
<style>
.el-pagination {
  display: flex;
  justify-content: center;
}
/* .el-button--blue {
  background-color: #409eff;
  color: #ffffff;
} */
.search-value {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
}
.search-value .search-input {
  width: 200px;
}
.search-value > span {
  padding-left: 15px;
  font-size: 14px;
}
.search-value .search-height {
  margin-left: 15px;
}
.menu-width {
  width: 100%;
}
</style>

