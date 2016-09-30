<template v-cloak>
    <div>
        <label class="ui-button ui-button-flat color-default" style="width:10px;height: 20px;">
            <input type="file" name="file" id="upload-file">
            上传
        </label>
        <table class="table table-striped table-hover">
            <thead>
            <tr>
                <th>文件名</th>
                <th>文件存储路径</th>
                <th>文件上传时间</th>
                <th>文件操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="file in files">
                <td>{{file.fileName}}</td>
                <td>{{file.filePath}}</td>
                <td>{{file.time}}</td>
                <td>
                    <ui-button color="warning" v-on:click="deleteFile( file.id )">删除</ui-button>
                    <a href="/download/{{file.id}}">
                        <ui-button color="primary">下载</ui-button>
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
    body {
        margin: 0;
        padding: 0;
    }

    .table {
        width: 1200px;
    }

    .table > thead > tr > th {
        vertical-align: bottom;
        border-bottom: 2px solid #ddd;

    }

    .table > thead > tr > th, .table > tbody > tr > th,
    .table > tfoot > tr > th, .table > thead > tr > td,
    .table > tbody > tr > td, .table > tfoot > tr > td {
        padding: 4px;
        line-height: 2.4;
        vertical-align: top;
        border-top: 1px solid #ddd;
    }

    th {
        text-align: left;
    }

    table {
        border-spacing: 0;
        border-collapse: collapse;
    }

    .table-striped > tbody > tr:nth-child(odd) {
        background-color: #f9f9f9
    }

    .table-hover > tbody > tr:hover {
        background-color: #f5f5f5
    }

    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }
</style>
<script>
    import store from '../src/store'
    import UiButton from 'keen-ui/lib/UiButton'

    export default{
        ready(){
            this.$http.get('/files').then(function (res) {
                store.addFileToFiles(res.data);
            });
            $('#upload-file').AjaxFileUpload({
                action: "/upload",
                onComplete: function (filename, response) {
                    console.log(response);
                }
            });
        },
        data(){
            return {
                files: store.getFiles()
            }
        },
        components: {
            UiButton
        },
        methods: {
            deleteFile(id){
                this.$http.delete('/delete/' + id).then(function (res) {

                })
            }
        }
    }
</script>