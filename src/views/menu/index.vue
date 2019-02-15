<template>
  <div class="app-container">
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
          {{ scope.row.ID }}
        </template>
      </el-table-column>
      <el-table-column
        prop="Name"
        label="菜单名称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="LinkUrl"
        label="菜单地址"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="Area"
        label="菜单区域"
      ></el-table-column>
      <el-table-column
        prop="Controller"
        label="控制器"
      ></el-table-column>
      <el-table-column
        prop="Action"
        label="方法"
      ></el-table-column>
      <el-table-column
        prop="Icon"
        label="图标地址"
      ></el-table-column>
      <el-table-column
        prop="OrderSort"
        label="排序"
      ></el-table-column>
      <el-table-column
        prop="Description"
        label="描述"
      ></el-table-column>
      <el-table-column label="是否菜单">
        <template slot-scope="scope">
          <el-tag :type="scope.row.IsMenu | statusFilter">{{ scope.row.IsMenu }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="禁用">
        <template slot-scope="scope">
          <el-tag :type="scope.row.Enabled | statusFilter">{{ scope.row.Enabled }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="CreateBy"
        label="创建者"
      ></el-table-column>
      <el-table-column
        prop="CreateTime"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        prop="ModifyBy"
        label="修改者"
      ></el-table-column>
      <el-table-column
        prop="CreateTime"
        label="修改时间"
      ></el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="150"
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
            <el-form-item label="菜单名称">
              <el-input v-model="form.Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单链接地址">
              <el-input v-model="form.LinkUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单区域">
              <el-input v-model="form.Area"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="控制器">
              <el-input v-model="form.Controller"></el-input>
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
            <el-form-item label="菜单编号">
              <el-input v-model="form.Code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单排序">
              <el-input v-model="form.OrderSort"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单描述">
              <el-input v-model="form.Description"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否是右侧菜单">
              <el-switch v-model="form.IsMenu"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否激活">
              <el-switch v-model="form.Enabled"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="活动区域">
          <el-select
            v-model="form.region"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col
            class="line"
            :span="2"
          >-</el-col>
          <el-col :span="11">
            <el-time-picker
              type="fixed-time"
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item> -->
        <!-- <el-form-item label="即时配送">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="form.type">
            <el-checkbox
              label="美食/餐厅线上活动"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="地推活动"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="线下主题活动"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="单纯品牌曝光"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
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
import { getPageList, getMenuByID, saveMenuData } from "@/api/menu";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: "success",
        false: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      currentPage: 1,
      totalCount: 1,
      pageSize: 5,
      centerDialogVisible: false,
      form: {
        Name: "",
        LinkUrl: "",
        Area: "",
        Controller: "",
        Icon: "",
        Code: "",
        OrderSort: "",
        Description: "",
        IsMenu: true,
        Enabled: true
      }
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
    handleEdit(rowindex, row) {
      this.centerDialogVisible = true;
      getMenuByID(row.Id).then(r => {
        if (r.Success) {
          this.form = r.Data;
        }
      });
    },
    handleDelete(rowindex, row) {
      this.centerDialogVisible = true;
    },
    loadTableData() {
      this.listLoading = true;
      getPageList(this.currentPage, this.pageSize).then(r => {
        if (r.Code == 1) {
          console.log(r.Data);
          this.list = r.Data;
          this.totalCount = r.Count;
          this.listLoading = false;
        }
      });
    },
    savemenu() {
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
    },
    onSubmit() {
      console.log("submit!");
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
</style>

