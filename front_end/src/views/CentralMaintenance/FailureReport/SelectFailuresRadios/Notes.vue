<template>
  <div style="height:50vh">
    <div>
      <div v-for="(item, index) in noteArray"
           :key="index">
        <el-row class="note-container">
          <div class="div-title"> {{ item.noteDate }} </div>
          <div class="content-item"> {{ item.noteText }} </div>
        </el-row>
      </div>
      <div class="table-outer-note">
        <el-button circle
                   clearable
                   slot="reference"
                   class="table-outer-button"
                   icon="el-icon-circle-plus-outline"
                   @click="isAddNotesSelected = true"></el-button>
      </div>
    </div>
    <el-dialog center
               :visible.sync="isAddNotesSelected"
               :show-close=false
               title="ADD NOTES">
      <el-input type="textarea"
                placeholder="Please enter new note here"
                v-model="textarea"
                maxlength="146"
                show-word-limit>
      </el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="confirmNoteAdd">Save</el-button>
        <el-button @click="cancelNoteAdd">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import qs from 'qs'
import { addNote, postNote } from '@/services/centralMaintenance/failureReport'

export default {
  name: "Notes",
  data() {
    return {
      noteArray: [],
      isAddNotesSelected: false,
      textarea: ""
    };
  },
  methods: {

    confirmNoteAdd() {

      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId))
      );

      let currentDate = new Date();
      let tmp = qs.stringify({
        failureNameInfo: objSelectedData.failureNameInfo,
        failureNote: {
          "noteDate": `${currentDate.getFullYear()}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`,
          "noteText": this.textarea
        }
      });

      if (this.textarea.length !== 0) {
        addNote(tmp).then(response => {

          if (response.status == "success") {
            this.$message({ message: 'Record updated successfully', type: 'success' });
            this.getNoteData()
          } else if (response.status == "error") {
            this.$message({ message: 'Error updating record' });
          } else {
            this.$message({ message: 'No records found' });
          }

        }).catch(error => {
          console.error('Error in fetching parameter list:', error);
        });
        this.textarea = ""
        this.isAddNotesSelected = false

      } else {
        this.$message({ message: 'Please enter at least one character' });
      }
    },

    cancelNoteAdd() {
      this.$message({
        message: 'Already canceled'
      });
      this.textarea = ""
      this.isAddNotesSelected = false
    },

    /**
     * 本函数用于mounted中，获取state中所选行的selectedFailureId数据，并noteArray
     */
    getNoteData() {

      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId))
      );

      let tmp = qs.stringify({
        failureNameInfo: objSelectedData.failureNameInfo
      });

      postNote(tmp).then(response => {
        if (response.length == 0) {
          this.noteArray = []
        } else {
          this.noteArray = JSON.parse(response[0].failureNote)
        }
      }).catch(error => {
        console.error('Error in fetching parameter list:', error);
      });
    },
  },

  mounted() {
    this.getNoteData()
    // 监听selectedFailureId变化，当变化时重新调用getParameterData函数
    this.$watch('$store.state.failureList.selectedFailureId', (newVal, oldVal) => {
      if (newVal !== oldVal) {
        this.getNoteData()
      }
    });
  },
};
</script>
<style scoped></style>
