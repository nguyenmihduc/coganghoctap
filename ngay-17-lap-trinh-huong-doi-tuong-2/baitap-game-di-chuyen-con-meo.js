    class ConMeo {
        constructor(image, top, left, size) {
            this.image = image;
            this.top = top;
            this.left = left;
            this.size = size;
        }
        getHeroElement() {
            return '<img width="'+ this.size + '"' +
              ' height="'+ this.size + '"' +
              ' src="' + this.image +'"' +
              ' style="top: '+this.top+'px; left:'+this.left+'px;position:absolute;" />';
        }
        moveRight() {
            this.left += 20;
            console.log('ok: ' + this.left);
        }
        moveLeft() {
            this.left -= 20;
            console.log('ok: ' + this.left);
        }
        moveDown() {
            this.top += 20;
            console.log('ok: ' + this.top);
        }
        moveUp() {
            this.top -= 20;
            console.log('ok: ' + this.top);
        }
    }

    let hero = new ConMeo('meo3.png', 200, 500, 150);
    function moveUp() {
        if (hero.top > 0 ) {
        hero.moveUp();
        }
        document.getElementById('game').innerHTML = hero.getHeroElement();
        // setTimeout(moveUp, 100)
    }

    function moveDown() {
        if (hero.top < window.innerHeight - hero.size) {
        hero.moveDown();
        }
        document.getElementById('game').innerHTML = hero.getHeroElement();
        // setTimeout(moveDown, 100)
    }

    function moveLeft() {
        if (hero.left >  0) {
            hero.moveLeft();
        }
        document.getElementById('game').innerHTML = hero.getHeroElement();
        // setTimeout(moveLeft, 100)
    }

    function moveRight() {
        if (hero.left < window.innerWidth - hero.size) {
            hero.moveRight();
        }
        document.getElementById('game').innerHTML = hero.getHeroElement();
        // setTimeout(moveRight, 100)
    }

    function DiaUpLeft() {
        if (hero.top > 0 ) {
            hero.moveUp();
            hero.moveLeft();
        }
        document.getElementById('game').innerHTML = hero.getHeroElement();
        // setTimeout(DiaUpLeft, 100)
    }

    function DiaUpRight() {
        if (hero.top > 0 ) {
            hero.moveUp();
            hero.moveRight();
        }
        document.getElementById('game').innerHTML = hero.getHeroElement();
        // setTimeout(DiaUpRight, 100)
    }

    function DiaDownRight() {
        if (hero.top < window.innerHeight - hero.size) {
            hero.moveDown();
            hero.moveRight();
        }
        document.getElementById('game').innerHTML = hero.getHeroElement();
        // setTimeout(DiaDownRight, 100)
    }

    function DiaDownLeft() {
        if (hero.top < window.innerHeight - hero.size) {
            hero.moveDown();
            hero.moveLeft();
        }
        document.getElementById('game').innerHTML = hero.getHeroElement();
        // setTimeout(DiaDownLeft, 100)
    }