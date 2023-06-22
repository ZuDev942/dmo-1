<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Tabs, Input, TabPane, Form, FormItem, Textarea } from "ant-design-vue";

const value = ref<string>("account006");
const activeKey = ref<string>("1");

interface IContract {
  conName: string;
  conType: string;
  salaryBasic: string;
  branch: string;
  staffType: string;
  endDay: any;
  note: string;
  conNumber: string;
  salaryGross: string;
  salaryCap: string;
  department: string;
  payment: string;
}

const contract = reactive<IContract>({
  conName: "SHHSG00392/33884",
  conType: "Thu viec",
  salaryBasic: "10.000.000 vnd",
  branch: "Nam Tu Liem",
  staffType: "Partime",
  endDay: "2023/05/05",
  note: "OK",
  conNumber: "ASIS2023",
  salaryGross: "12.000.000 vnd",
  salaryCap: "0",
  department: "Developer",
  payment: "Bank Transfer",
});
</script>

<template>
  <div class="tabs">
    <Tabs v-model:activeKey="activeKey">
      <!-- Profile -->
      <TabPane key="1" tab="PROFILE">
        <div class="profile">
          <div class="account">
            <h1>Account Info</h1>
            <div class="account__wrap">
              <div class="account__avatar">
                <img src="@/assets/images/avatar.jpeg" alt="" />
              </div>

              <div>
                <div class="account__box">
                  <div class="account__box--name">Employee ID</div>
                  <Input
                    v-model:value="value"
                    placeholder="Search by ID, name..."
                    style="width: 200px"
                    disabled
                  />
                </div>
                <div class="account__box">
                  <div class="account__box--name">Password</div>
                  <Input
                    v-model:value="value"
                    placeholder="Search by ID, name..."
                    style="width: 200px"
                  />
                </div>
                <div class="account__box">
                  <div class="account__box--name">Roles</div>
                  <Input
                    v-model:value="value"
                    placeholder="Search by ID, name..."
                    style="width: 200px"
                  />
                </div>
                <div class="account__box">
                  <div class="account__box--name">Permission Template</div>
                  <Input
                    v-model:value="value"
                    placeholder="Search by ID, name..."
                    style="width: 200px"
                  />
                </div>
                <div class="account__box">
                  <div class="account__box--name">Email Company</div>
                  <Input
                    v-model:value="value"
                    placeholder="Search by ID, name..."
                    style="width: 200px"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="main">
            <h1>Main Info</h1>
            <div>
              <div class="account__box">
                <div class="account__box--name">Fullname</div>
                <Input
                  v-model:value="value"
                  placeholder="Search by ID, name..."
                  style="width: 200px"
                  disabled
                />
              </div>
              <div class="account__box">
                <div class="account__box--name">Shortname</div>
                <Input
                  v-model:value="value"
                  placeholder="Search by ID, name..."
                  style="width: 200px"
                />
              </div>
              <div class="account__box">
                <div class="account__box--name">Gender</div>
                <Input
                  v-model:value="value"
                  placeholder="Search by ID, name..."
                  style="width: 200px"
                />
              </div>
              <div class="account__box">
                <div class="account__box--name">Birthday</div>
                <Input
                  v-model:value="value"
                  placeholder="Search by ID, name..."
                  style="width: 200px"
                />
              </div>
              <div class="account__box">
                <div class="account__box--name">Email Personal</div>
                <Input
                  v-model:value="value"
                  placeholder="Search by ID, name..."
                  style="width: 200px"
                />
              </div>
              <div class="account__box">
                <div class="account__box--name">Address</div>
                <Input
                  v-model:value="value"
                  placeholder="Search by ID, name..."
                  style="width: 200px"
                />
              </div>
              <div class="account__box">
                <div class="account__box--name">Signday</div>
                <Input
                  v-model:value="value"
                  placeholder="Search by ID, name..."
                  style="width: 200px"
                />
              </div>
            </div>
          </div>

          <div class="other">
            <h1>Other Info</h1>
          </div>
        </div>
      </TabPane>

      <!-- Contract -->
      <TabPane key="2" tab="CONTRACT">
        <div class="contract">
          <div class="contract__wrap">
            <h3>Sign Day - 2022/03/01</h3>

            <Form
              ref="formRef"
              name="custom-validation"
              :model="contract"
              class="grid grid-cols-2"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }"
            >
              <FormItem label="Contract Name" name="conName" class="mb-3">
                <Input v-model:value="contract.conName" disabled />
              </FormItem>

              <FormItem label="Contract Type" name="conType" class="mb-3">
                <Input v-model:value="contract.conType" disabled />
              </FormItem>

              <FormItem label="Salary Basic" name="salaryBasic" class="mb-3">
                <Input v-model:value="contract.salaryBasic" disabled />
              </FormItem>

              <FormItem label="Branch" name="branch" class="mb-3">
                <Input v-model:value="contract.branch" disabled />
              </FormItem>

              <FormItem label="Staff Type" name="staffType" class="mb-3">
                <Input v-model:value="contract.staffType" disabled />
              </FormItem>

              <FormItem label="End Day" name="endDay" class="mb-3">
                <Input v-model:value="contract.endDay" disabled />
              </FormItem>

              <FormItem label="Contract Number" name="conNumber" class="mb-3">
                <Input v-model:value="contract.conNumber" disabled />
              </FormItem>

              <FormItem label="Salary Gross" name="salaryGross" class="mb-3">
                <Input v-model:value="contract.salaryGross" disabled />
              </FormItem>

              <FormItem label="Salary Capacity" name="salaryCap" class="mb-3">
                <Input v-model:value="contract.salaryCap" disabled />
              </FormItem>

              <FormItem label="Department" name="department" class="mb-3">
                <Input v-model:value="contract.department" disabled />
              </FormItem>

              <FormItem label="Payment Method" name="payment" class="mb-3">
                <Input v-model:value="contract.payment" disabled />
              </FormItem>

              <FormItem label="Note" name="note" class="mb-3">
                <Textarea v-model:value="contract.note" disabled ></Textarea>
              </FormItem>
            </Form>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
