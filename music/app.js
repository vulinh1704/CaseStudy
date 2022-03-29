// 1. Xuất bài hát
// 2. Cuộn lên trên
// 3. Phát / Dừng / Tìm Kiếm
// 4. Xoay đĩa
// 5. Tiếp theo / Trước
// 6. Xáo trộn
// 7. Lặp lại khi kết thúc
// 8. Phát bài hát
// 9. Di chuyển bài hát đang hoạt động vào chế độ xem
// 10. Phát bài hát khi click

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playlist');
const musicDuration = $('.duration');
const current = $('.current');
const loli = $('.loli');
const add = $('.add');
const app = {
    currenIndex: 0,  // vi tri index
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isTrash: false,
    songs: [
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: '../musicMp3/song1.mp3',
            image: '../picture/song1.png'
        },
        {
            name: 'Summer Time',
            singer: 'K-391',
            path: '../musicMp3/song2.mp3',
            image: '../picture/song2.png'
        },
        {
            name: 'Sakura_Taro',
            singer: 'Sakura',
            path: '../musicMp3/song3.mp3',
            image: '../picture/song3.png'
        },
        {
            name: 'Music Dam Ma Supper Fire',
            singer: 'singer',
            path: '../musicMp3/song4.mp3',
            image: '../picture/song4.png'
        },
        {
            name: 'Thoi Doi',
            singer: 'CheLinh',
            path: '../musicMp3/song5.mp3',
            image: '../picture/song5.png'
        },
        {
            name: 'Supper Idol Chill',
            singer: 'ThangDan',
            path: '../musicMp3/song6.mp3',
            image: '../picture/song6.png'
        },
        {
            name: 'Are you hiding something ?',
            singer: 'DenVau',
            path: '../musicMp3/song7.mp3',
            image: '../picture/song7.png'
        },
        {
            name: 'Baby Shark (Trap Remix)',
            singer: 'Child',
            path: '../musicMp3/song8.mp3',
            image: '../picture/song8.png'
        },
        {
            name: 'Golf HienHo Music ',
            singer: 'HH',
            path: '../musicMp3/song9.mp3',
            image: '../picture/song9.png'
        },
        {
            name: 'Chill',
            singer: 'LaoGia',
            path: '../musicMp3/song10.mp3',
            image: '../picture/song10.png'
        },
        {
            name: 'Tru Mua',
            singer: 'HKT',
            path: '../musicMp3/song11.mp3',
            image: '../picture/song11.png'
        },
        {
            name: 'Two Moons',
            singer: 'BoyWithUke',
            path: '../musicMp3/song12.mp3',
            image: '../picture/song12.png'
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
               <div class="song  ${index === this.currenIndex ? 'active' : ''}"  data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="loli" id = 'loli${index}'>             
                </div>
                <div class="option" ><i class="fas fa-crown"></i></div>
                <div class="trash"><i class="fas fa-trash" style="size: 5px ;color: #ec1f55" ></i></div>
            </div>
            `
        })
        playList.innerHTML = htmls.join('');
    },


    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currenIndex];
            }
        })
    },
    handledEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;


        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        // Xử lý phóng to thu nhỏ của CD
        document.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        //add song
        add.onclick = function () {
            name = prompt('Enter song Name : ');
            tg = prompt('Enter Music Link');
            _this.songs.push({
                name: name,
                singer: `<a href="${tg}">${tg}</a>`
            })
            _this.render();

        }

        //Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }


        // Khi song được play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
            document.getElementById('loli' + _this.currenIndex).innerHTML =
                '<img src="../loli.gif" style="width: 50px;height:50px">';
        }

        // Khi song bị pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
            document.getElementById('loli' + _this.currenIndex).innerHTML = '';
        }


        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }

            // Xử lý time bài hát
            let audioDuration = audio.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSet = Math.floor(audioDuration % 60);
            if (totalSet < 10) {
                totalSet = `0${totalSet}`;
            }
            musicDuration.innerText = `${totalMin}:${totalSet}`;

            // Xử lý time now bài hát
            let currentNow = audio.currentTime;
            let currentMin = Math.floor(currentNow / 60);
            let currentSet = Math.floor(currentNow % 60);
            if (currentSet < 10) {
                currentSet = `0${currentSet}`;
            }
            current.innerText = `${currentMin}:${currentSet}`;

        }

        // Xử lý khi tua song
        progress.onchange = function (e) {
            const seekTime = e.target.value / 100 * audio.duration;
            audio.currentTime = seekTime;
            audio.play();
        }

        // Khi next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }
        // Khi prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // Xử lý bật / tắt Random
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
        }


        // Xử lý lặp lại 1 song
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat); // toggle : chuyen doi ;
        }


        // Xử lý song khi audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }


        // Lắng nghe hành vi vào playList
        playList.onclick = function (e ,index) {
            const songNote = e.target.closest('.song:not(.active)');
            const trash = e.target.closest('.trash');
            if (trash) {
                let a = confirm('Are you sure ?');

                // Xử lý xóa song
                if (a) {
                    let x = prompt('Enter the order of songs you want to delete');
                    x = x - 1;
                    _this.songs.splice(x, 1);
                    audio.pause();
                    nextBtn.click();
                    _this.render();
                }else{
                    alert('Are you kidding me?');
                }
            }

            if (songNote) {
                // Xử lý khi click vào song
                if (songNote && !trash) {
                    _this.currenIndex = Number(songNote.dataset.index);
                    _this.loadCurrenSong();
                    audio.play();
                    _this.render();

                }
            }
        }
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 500)
    },
    loadCurrenSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function () {
        this.currenIndex++;
        if (this.currenIndex >= this.songs.length) {
            this.currenIndex = 0;
        }
        this.loadCurrenSong();
    },
    prevSong: function () {
        this.currenIndex--;
        if (this.currenIndex < 0) {
            this.currenIndex = this.songs.length - 1;
        }
        this.loadCurrenSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currenIndex)
        this.currenIndex = newIndex;
        this.loadCurrenSong();
    },

    start: function () {
        this.defineProperties(); // Định nghĩa các thuộc tính cho object

        this.handledEvents();    // Bắt các sự kiện

        this.loadCurrenSong();   // Tải các thông tin bài hát tiên vào UI

        this.render();           // kết xuất Playlis

    }
}
app.start();




