// -	Thiết lập dự án (Project Setup)
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // lấy bối cảnh

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0, canvas.width, canvas.height) // định dạng khung canvas

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background-06.jpg'
})

const gravity = 0.7  // tạo trọng lực giải quyết vấn đề đối tượng chưa chạm hẳn xuống mép màn hình

const player = new Fighter({  // tạo đối tượng player và đặt vị trí xuất hiện cho đối tượng theo tọa độ
    position: {
        x: 100,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10    // trục y tăng 10, giống như là vận tốc rơi xuống là 10
    },
    offset: {
        x: 0,
        y: 0
    },
    imageHeroSrc: './img/character-02.png',
    weaponSrc: './img/character-04.png'
})

const enemy = new Fighter({   // tạo đối tượng enemy và đặt vị trí xuất hiện cho đối tượng theo tọa độ
    position: {
        x: 780,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10  // trục y tăng 10, giống như là vận tốc rơi xuống là 10
    },
    offset: {
        x: -80,
        y: 0
    },
    imageHeroSrc: './img/character-03.png',
    weaponSrc: './img/character-05.png'
})

console.log(player)

const keys = {  // tạo đối tượng keys khai báo các phím (thộc tính) muốn dùng để điều khiển trò chơi
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)   // cho trình duyệt biết rằng bạn muốn thực hiện hoạt ảnh và yêu cầu trình duyệt gọi một hàm được chỉ định để cập nhật hoạt ảnh trước lần sơn lại tiếp theo.
    // c.fillStyle = 'black'                                // nền đen và hoạt cảnh mới (là việc gọi phương thức update bên dưới) liên tục thay phiên đè lên nhau tạo thành hình ảnh di chuyển
    // c.fillRect(0, 0, canvas.width, canvas.height)      // chứ không phải dùng clearRect vì dùng clearRect sẽ mất đi nền đen
    background.update()
    player.update()
    enemy.update()

    player.velocity.x = 0;      // điều này là dừng mọi khung hình (di chuyển) khi không giữ phím nào cả
    enemy.velocity.x = 0;

    if (keys.a.pressed && player.lastKey === 'a') {           // player movement
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {           // enemy movement
        enemy.velocity.x = -5
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }
                                                        // detect for collision (phát hiện va chạm)
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
        }) &&
        player.isAttacking
    ) {
        player.isAttacking = false
        enemy.health -= 5                                  // thanh máu giảm dần khi bị trúng đòn
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'   // thanh máu giảm dần khi bị trúng đòn
    }

    if (rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking
    ) {
        enemy.isAttacking = false
        player.health -= 5
        document.querySelector('#playerHealth').style.width = player.health + '%'
    }
                                                     // check win khi hết máu
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player,enemy, timerId})
    }
}

animate()

// -	Di chuyển nhân vật với trình bắt sự kiện (Move Characters with Event Listeners)
window.addEventListener('keydown', (event) => {
    // console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        case 'w':
            player.velocity.y = -20
            break;
        case ' ':
            player.attack()
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20
            break;
        case 'ArrowDown':
            enemy.attack()
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
    }
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
    }
})



