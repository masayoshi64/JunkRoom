var app = new Vue({
    el: '#app',
    data: {
        refleshFlag: true, //強制的に再描画するためのフラグ
        timeTable: [], //時間割のデータ
        week: ["月", "火", "水", "木", "金"],
        showModal: false, //編集画面を表示するフラグ
        modalRow: 0, //編集する授業のid
        modalCol: 0,
        numClick: 0,
        timer: null,
        delay: 200, //dblclick反応ギリギリ
    },
    delimiters: ['[[', ']]'],
    created: function () {
        // localStorageにデータを保存
        if (!localStorage['timeTable']) {
            this.init();
        }
        this.timeTable = JSON.parse(localStorage['timeTable']);
    },
    methods: {
        // 空の時間割で初期化
        init() {
            let table = []
            for (let period = 0; period < 5; period++) {
                let row = []
                for (let day = 0; day < 5; day++) {
                    row.push({ name: "naiyo", url: "", hour: 1 })
                }
                table.push(row);
            }
            localStorage['timeTable'] = JSON.stringify(table)
        },
        // 強制的に再描画
        reflesh() {
            this.refleshFlag = false;
            this.$nextTick(() => (this.refleshFlag = true));
        },
        // 編集画面を表示
        openModal(row, col) {
            this.showModal = true;
            this.modalCol = col;
            this.modalRow = row;
        },

        //　編集画面を閉じる
        closeModal() {
            this.showModal = false;
            this.reflesh();
            let hour = Number(this.timeTable[this.modalRow][this.modalCol].hour);
            // 結合して不要になるセルを削除
            for (let i = this.modalRow + 1; i < this.modalRow + hour; i++) {
                const element = this.timeTable[i][this.modalCol];
                element.hour = 0;
            }
            // 結合を解除して必要になったセルを追加
            for (let i = this.modalRow + hour; i < this.timeTable.length; i++) {
                const element = this.timeTable[i][this.modalCol];
                if (element.hour != 0) break;
                element.hour = 1;
            }
            this.saveTimeTable();
        },

        // 時間割をlocalStorageに保存
        saveTimeTable() {
            localStorage['timeTable'] = JSON.stringify(this.timeTable);
        },
        update() {

        },

        openUrl(i, j) {
            let url = this.timeTable[i][j].url;
            window.open(url, '_blank');
        },
        //clickとdoubleclickを併用するための関数
        onClick(i, j) {
            this.numClick++
            if (this.numClick === 1) {
                var self = this
                this.timer = setTimeout(function () {
                    self.openModal(i, j);//single clickの場合
                    self.numClick = 0;
                }, this.delay);
            } else {
                clearTimeout(this.timer);
                this.openUrl(i, j);//double clickの場合
                this.numClick = 0;
            }
        }
    },
});