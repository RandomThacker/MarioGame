//---------Declaring Variables----------------
mario = document.querySelector(".mario")
marioImage = document.querySelector(".marioImage")
dragon = document.querySelector(".dragon")
gameOver = document.querySelector(".gameOver")
scoreCount = document.querySelector(".score")
startGame = document.querySelector(".startGame")
scoreDiv = document.querySelector(".scoreDiv")
let score = 0;
cross = true
audioNormal = new Audio("/audio/NormalSpeed.mp3")
audioSpeed = new Audio("/audio/SpeedUp.mp3")
audioGameOver = new Audio("/audio/GameOver.mp3")
audioJump = new Audio("/audio/jump.mp3")

//-----------Key Actions-------------
document.onkeydown = (e) => {
    console.log(e.keyCode)
    //----------"1" Key----------
    if (e.keyCode == 49) {
        marioImage.src = "/images/mario1.gif"
        startGame.style.display = "none";
        scoreDiv.style.visibility = "visible"
        dragon.style.animationName = "dragon";
        audioNormal.play()
    }

     //------------"2" Key--------------
     else if (e.keyCode == 50) {
        window.location.href = "../MarioGameLv2/index.html";
    }

    //------------Up Key--------------
    else if (e.keyCode == 38) {
        mario.classList.add("animateMario")
        audioJump.play()
        setTimeout(() => {
            console.log("remove")
            mario.classList.remove("animateMario")
        }, 800)
    }

    //----------Right Key---------------
    else if (e.keyCode == 39) {
        mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = mx + 15 + "px"
        mario.style.transform = "scaleX(1)";
    }

    //----------Left Key------------
    else if (e.keyCode == 37) {
        mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = mx - 15 + "px"
        mario.style.transform = "scaleX(-1)";

    }
}


//---------To check collison and Increase score
setInterval(() => {
    mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));

    dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));

    console.log(dx)

    offsetX = Math.abs(mx - dx)
    offsetY = Math.abs(my - dy)

    //------------Check Collision-----------
    if (offsetX < 15 && offsetY < 22) {
        dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
        dragon.style.left = dx + "px"
        dragon.classList.remove("animateDragon")
        mario.classList.add("deadMario")
        setTimeout(() => {
            mario.style.bottom = "-100px"
        }, 1000)
        cross = false
        audioNormal.pause()
        audioSpeed.pause()
        audioGameOver.play()
        setTimeout(() => {
            gameOver.style.visibility = "visible"
        }, 1500)
    }

    //-----------Increase score and speed----------------
    else if (dx == 0 && cross) {
        updateScore()
        cross = false
        setTimeout(() => {
            cross = true;
        }, 1000)
        // setTimeout(() => {
        aniDur = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.2;
        if (newDur <= 3.5) {
            audioNormal.pause()
            audioSpeed.play()
        }
        if (newDur <= 2) {
            newDur = 2
            dragon.style.animationDuration = newDur + "s";
            console.log(newDur)
        }
        else if((score/100)%2==0) {
            dragon.style.animationDuration = newDur + "s";
            console.log(newDur)
        }
        // }, 1000)
    }
})

function updateScore() {
    score += 100;
    scoreCount.innerHTML = score;
}