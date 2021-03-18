const EMPTY = 0;
const BLACK = 1;
const WHITE = -1;
const WALL = 2;
const BOARD_SIZE = 6;
const app = new Vue({
    el: "#app",
    data: {
        board: [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [0, 0, 0, 1, -1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],
        direction: [
            [-1, -1],
            [0, -1],
            [1, -1],
            [1, 0],
            [1, 1],
            [0, 1],
            [-1, 1],
            [-1, 0],
        ],
        movableDir: [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],
        flipCnt: [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],
        totalDamage: [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],
        currentcolor: 1,
        refleshFlag: true,
        rawAttack: 0,
        attackCoef: 1,
        specialCoef: 0,
        fullHP: 1,
        currentHP: 1,
        lifeBurst: 0,
        lifeBurstDamage: 0,
    },
    created: function () {

        for (let x = 0; x < this.board.length; x++) {
            this.board[x][0] = WALL;
            this.board[x][BOARD_SIZE + 1] = WALL;
            this.board[0][x] = WALL;
            this.board[BOARD_SIZE + 1][x] = WALL;
        }
        this.initTurn();
    },
    methods: {
        reflesh() {
            this.refleshFlag = false;
            this.$nextTick(() => (this.refleshFlag = true));
        },
        update: function (event, value) {
            this.initTurn();
            this.reflesh();
        },
        clicked: function (tr_num, td_num) {

            if (this.put(tr_num, td_num)) {
                this.currentcolor *= -1;
                this.reflesh();
                this.initTurn();
            }

        },
        put: function (tr, td) {
            const flipdir = this.movableDir[tr][td];
            if (flipdir == 0) return false;
            this.board[tr][td] = this.currentcolor;
            for (let i = 0; i < this.direction.length; i++) {
                if ((flipdir & (1 << i)) == 0) continue;
                const dir = this.direction[i];
                var x = tr + dir[0];
                var y = td + dir[1];
                while (this.board[x][y] == -this.currentcolor) {
                    this.board[x][y] = this.currentcolor;
                    x += dir[0];
                    y += dir[1];

                }
            }
            return true; `
            `
        },
        checkMovable: function (tr, td, color) {

            if (this.board[tr][td] != EMPTY) return [0, 0];
            var flipdir = 0;
            var flipcnt = 0;
            for (let i = 0; i < this.direction.length; i++) {
                const dir = this.direction[i];
                var x = tr;
                var y = td;
                var cnt = 0;
                x += dir[0];
                y += dir[1];
                if (this.board[x][y] == -color) {
                    while (this.board[x][y] == -color) {
                        x += dir[0];
                        y += dir[1];
                        cnt++;
                    }
                    if (this.board[x][y] == color) {
                        flipdir += (1 << i);
                        flipcnt += cnt;
                    }
                }
            }

            return [flipdir, flipcnt];
        },
        initTurn: function () {
            for (let x = 1; x <= BOARD_SIZE; x++) {
                for (let y = 1; y <= BOARD_SIZE; y++) {
                    var [dir, cnt] = this.checkMovable(x, y, this.currentcolor)
                    this.movableDir[x][y] = dir;
                    this.flipCnt[x][y] = cnt;
                    this.updateTotalDamage(x, y);
                }
            }
        },
        updateTotalDamage(x, y) {
            const attack = this.rawAttack * this.attackCoef * (1.2) ** (this.flipCnt[x][y] - 1);
            this.totalDamage[x][y] = Math.round(attack + this.specialCoef * attack + this.lifeBurstDamage);
        },
        updateLifeBurst() {
            this.lifeBurstDamage = this.lifeBurst * this.currentHP / this.fullHP;
        }
    },
})

