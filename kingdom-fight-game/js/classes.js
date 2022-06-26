class Sprite {                       // tạo lớp nền
    constructor({position, imageSrc}) {
        this.position = position;
        this.image = new Image()
        this.image.src = imageSrc
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    update() {
        this.draw()
    }
}

class Fighter {                       // Taọ lớp nhân vật
    constructor({position, velocity, offset, imageHeroSrc, weaponSrc }) {
        this.position = position;    // tọa độ xuất hiện nhân vật
        this.velocity = velocity;   // thuộc tính vận tốc.
        this.width = 145;           // thuộc tính chiều ngang.
        this.height = 200;          // thuộc tính chiều cao.
        this.image = new Image()
        this.image.src = imageHeroSrc

        this.weapon = new Image()
        this.weapon.src = weaponSrc

        this.lastKey;
        this.attackBox = {       // thuộc tính tấn công (hộp chữ nhật có đầy đủ thuộc tính của 1 chữ nhật)
            position: {         // vị trí luôn gắn với vị trí đối tượng
                x: this.position.x,
                y: this.position.y
            },
            offset,          //
            width: 225,
            height: 135,
        }
        this.isAttacking;
        this.health = 100;
    }
    draw() {                        // phương thức vẽ nhân vật
        c.drawImage(this.image, this.position.x, this.position.y)

        if (this.isAttacking) {     // vẽ hộp attack
            c.drawImage(this.weapon, this.position.x + this.attackBox.offset.x, this.position.y)
        }
    }
    update() {                     //  phương thức vẽ đối tượng di chuyển
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x    // //   vẽ đối tượng theo hướng sang phải dựa vào trục x tăng
        this.position.y += this.velocity.y    //   vẽ đối tượng theo hướng rơi xuống dựa vào trục y tăng

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 30) {   // hàm if này để thiết lập việc đối tượng rơi xuống và dừng lại cuối màn hình (khi đó vận tốc =0)
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity;     // dòng này cho đối tượng thực sự ở trên giá trị canvas.height
        }
    }
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}