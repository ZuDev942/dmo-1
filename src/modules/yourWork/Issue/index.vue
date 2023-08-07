<template>
  <div>
    <Modal
      v-model:open="isIssue"
      wrapClassName="newStyle"
      @ok="handleOkIssue"
      :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
      :closable="false"
      :footer="null"
      width="1000px"
    >
      <!-- <Button @click="handleOk">Close</Button> -->
      <div class="modal__header">
        <div class="modal__title">
          <img src="@/assets/images/pencil.png" alt="" />
          <h3>Add issue</h3>
        </div>
        <img src="@/assets/images/close.png" alt="" @click="handleOkIssue" />
      </div>

      <div class="modal__wrap">
        <Form
          ref="formRef"
          name="custom-validation"
          :model="issueDetail"
          class="grid grid-cols-2 gap-8"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <div class="left">
            <div class="mb-4 select__title">
              <Input
                v-model:value="issueDetail.titleBug"
                placeholder="Title bug"
                class="text-[1.6rem] text-hrm-color"
              />
            </div>

            <FormItem
              label="Project ID"
              name="projectID"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.projectId">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem label="Work CD" name="workCD" class="mb-4 text-hrm-color">
              <Select ref="select" v-model:value="issueDetail.workCd">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem
              label="Classiff"
              name="classiff"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem
              label="Priority"
              name="classiff"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem
              label="Content bug"
              name="contentBug"
              class="mb-4 text-hrm-color"
            >
              <Textarea
                v-model:value="issueDetail.contentBug"
                placeholder="Add a description"
              ></Textarea>
            </FormItem>

            <FormItem
              label="Task ID"
              name="classiff"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem
              label="Reason"
              name="classiff"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <div class="flex mb-4 w-full justify-between">
              <div class="flex items-center">
                <div class="w-[155px]">Bug Repeat</div>
                <Input
                  v-model:value="issueDetail.bugRepeat"
                  disabled
                  size="small"
                  class="w-[40px] h-[32px] border-none text-center"
                ></Input>
              </div>

              <div class="flex items-center">
                <div class="w-[100px]">Bug Code</div>
                <Input
                  v-model:value="issueDetail.bugCode"
                  disabled
                  class="h-[32px] w-[170px] border-none"
                ></Input>
              </div>
            </div>

            <FormItem
              label="Checklist Reason"
              name="bugCode"
              class="mb-4 text-hrm-color"
            >
              <Checkbox v-model:checked="issueDetail.checklistReason.status">
                <Input
                  v-model:value="issueDetail.checklistReason.note"
                  :disabled="!issueDetail.checklistReason.status"
                  class="w-full"
                />
              </Checkbox>
            </FormItem>
          </div>

          <!--  -->
          <div>
            <div class="mb-4 select__status">
              <Select
                ref="selectStatus"
                v-model:value="issueDetail.status"
                class="mr-3"
              >
                <SelectOption value="1">New</SelectOption>
                <SelectOption value="2">ReOpen</SelectOption>
                <SelectOption value="3">Developing</SelectOption>
                <SelectOption value="4">Resolve</SelectOption>
                <SelectOption value="4">Closed</SelectOption>
                <SelectOption value="4">Reject</SelectOption>
              </Select>

              <DatePicker>
                <template #suffixIcon>
                  <img
                    src="@/assets/images/calender.png"
                    alt=""
                    class="calender__icon"
                  />
                </template>
              </DatePicker>
            </div>

            <div class="issue__border">
              <div class="issue__border--top">
                <h3>Details</h3>
              </div>

              <div class="p-[10px]">
                <FormItem
                  label="Assignee"
                  name="assignee"
                  class="mb-4 select__assignee"
                >
                  <Select
                    ref="selectAssign"
                    v-model:value="issueDetail.assignee"
                  >
                    <SelectOption value="1">Nguyen Thanh Nam</SelectOption>
                    <SelectOption value="2">IGHTK</SelectOption>
                    <SelectOption value="3">GHTK Pay</SelectOption>
                    <SelectOption value="4">Fast X</SelectOption>

                    <template #suffixIcon>
                      <img
                        class="w-8 h-8 rounded-full"
                        src="@/assets/images/default-wg-member.jpeg"
                        alt=""
                      />
                    </template>
                  </Select>
                </FormItem>

                <FormItem
                  label="Reviewer"
                  name="reviewer"
                  class="mb-4 select__assignee"
                >
                  <Select
                    ref="selectReview"
                    v-model:value="issueDetail.reviewer"
                  >
                    <SelectOption value="1">Le Duc A</SelectOption>
                    <SelectOption value="2">IGHTK</SelectOption>
                    <SelectOption value="3">GHTK Pay</SelectOption>
                    <SelectOption value="4">Fast X</SelectOption>

                    <template #suffixIcon>
                      <img
                        class="w-8 h-8 rounded-full"
                        src="@/assets/images/default-wg-member.jpeg"
                        alt=""
                      />
                    </template>
                  </Select>
                </FormItem>

                <FormItem label="Note" name="note" class="mb-4">
                  <Textarea v-model:value="issueDetail.note"></Textarea>
                </FormItem>

                <Upload
                  v-model:file-list="fileList1"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                >
                  <Button>
                    <UploadOutlined></UploadOutlined>
                  </Button>
                </Upload>
              </div>
            </div>

            <div class="issue__border">
              <div class="issue__border--top">
                <h3>History</h3>
              </div>
              <div class="p-[10px]">a</div>
            </div>
          </div>
        </Form>
      </div>

      <div class="modal__footer">
        <Button class="modal__btn">CREATE</Button>
      </div>
    </Modal>
  </div>
</template>
