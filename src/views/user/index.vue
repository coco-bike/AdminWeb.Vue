
   <template>
  <div class="app-container">
    <div class="search-value">
      <span>
        真实名称：
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
      height="750"
      style="width: 100%"
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
          {{ scope.row.uID }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="uLoginName"
        label="登录账号"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="uRealName"
        label="真实姓名"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="uHeaderImgUrl"
        label="头像地址"
        width="250"
      ></el-table-column>
      <el-table-column
        width="200"
        label="创建时间"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.uCreateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.uUpdateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最后登录"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.uLastErrTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="uErrorCount"
        label="错误次数"
      ></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.uStatus | statusFilter">{{ scope.row.uStatus==1?'启用':'禁用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="uRemark"
        label="备注"
        width="120"
      ></el-table-column>
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
            <el-form-item label="登录账号">
              <el-input v-model="form.uLoginName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录密码">
              <el-input v-model="form.uLoginPWD"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="真实姓名">
              <el-input v-model="form.uRealName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号状态">
              <el-switch v-model="form.uStatus"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                v-model="form.uRemark"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                :action="upLoadUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :headers="myHeaders"
                accept="image/jpeg,image/jpg,image/png">
              
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
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
          @click="save"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  getPageList,
  getInfoByID,
  saveInfoData,
  addInfoData,
  deleteInfoData
} from "@/api/user";
import { getToken } from "@/utils/auth";
import { dateNowStr } from "@/utils/index";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "danger",
        1: "success"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      selectList: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      listLoading: true,
      currentPage: 1,
      totalCount: 1,
      pageSize: 10,
      centerDialogVisible: false,
      menuName: "",
      isAdd: false,
      imageUrl: "",
      upLoadUrl: process.env.BASE_API + "/sysUserInfo/UploadFiles",
      myHeaders: { Authorization: getToken() },
      form: {
        uID: 0,
        uLoginName: "",
        uLoginPWD: "",
        uRealName: "",
        uStatus: 1,
        uRemark: "",
        uCreateTime: "",
        uUpdateTime: "",
        uLastErrTime: "",
        uHeaderImgUrl: ""
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
    //添加用户
    handleAdd() {
      this.centerDialogVisible = true;
      //清空数据
      Object.keys(this.form).forEach(s => {
        if (s == "uStatus" || s == "uID") {
          return (this.form[s] = 1);
        } else {
          this.form[s] = "";
        }
      });
      this.isAdd = true;
      this.imageUrl = "";
      this.form.uCreateTime = dateNowStr();
      this.form.uUpdateTime = dateNowStr();
      this.form.uLastErrTime = dateNowStr();
    },
    //修改用户
    handleEdit(rowindex, row) {
      this.centerDialogVisible = true;
      getInfoByID(row.uID).then(r => {
        if (r.Success) {
          this.form = r.Data;
          this.isAdd = false;
          this.imageUrl = "http://localhost:58427/"+this.form.uHeaderImgUrl;
          this.form.uStatus = this.form.uStatus == 1 ? true : false;
        }
      });
      this.form.uUpdateTime = dateNowStr();
    },
    //删除用户
    handleDelete(rowindex, row) {
      deleteInfoData(row.Id).then(r => {
        let msg = r.Msg;
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
    //加载列表
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
    //保存
    save() {
      this.saveFunction().then(r => {
        let msg = r.Msg;
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
    saveFunction() {
      this.form.uStatus = this.form.uStatus ? 1 : 0;
      return this.isAdd ? addInfoData(this.form) : saveInfoData(this.form);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.uHeaderImgUrl = res.path;
      console.log(res.path);
    },
    beforeAvatarUpload(file) {
      let testmsg=/^image\/(jpeg|png|jpg)$/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!testmsg) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return testmsg && isLt2M;
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

