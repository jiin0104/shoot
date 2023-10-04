//캔버스 이미지 셋팅
let canvas;
let ctx;

canvas = document.createElement("canvas"); //canvas만든다
ctx = canvas.getContext("2d"); //2d를 만들어준다
canvas.width = 400;
canvas.height = 700; //캔버스 높이

document.body.appendChild(canvas); //바디 태그에 캔버스를 셋팅한다

//이미지 불러오는 함수
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage; //이미지 변수 설정
let gameOver = false; //true면 게임 끝, false는 게임 시작
let score = 0;

//내 우주선 좌표. 계속 바뀌므로 따로 빼줌
let spaceshipX = canvas.width / 2 - 30; //반절 나눈후 우주선크기 반나눈값
let spaceshipY = canvas.height - 80; //우주선높이만큼뺀값600

//총알 함수
let bulletList = []; //총알들을 저장하는 리스트
function Bullet() {
	this.x = 0; //Bullet의 x,y값 0으로 정의
	this.y = 0;
	this.init = function () {
		//내 우주선 x,y값으로 초기화시키기
		this.x = spaceshipX + 20;
		this.y = spaceshipY;
		this.alive = true; //총알의 상태.true이면 살아있는 총알 false이면 죽은총알
		bulletList.push(this); //x,y,init(우주선값) 총알을 배열에 저장한다
	};
	//총알 발사 함수
	this.update = function () {
		this.y -= 7;
	};
	//적군 쳤을때
	this.checkHit = function () {
		//적군 리스트가져와
		for (let i = 0; i < enemyList.length; i++) {
			if (
				this.y <= enemyList[i].y &&
				this.x >= enemyList[i].x &&
				this.x <= enemyList[i].x + 60
			) {
//총알의 y값이 적군의 y값보다 작거나 총알의 x값이 적군의 x값보다 크고 총알의 x값이 적군의 x값보다 작으면
				score++;
				this.alive = false;
				enemyList.splice(i, 1);
			} //점수 증가시키고, 죽은 총알, 적군리스트에서 i번째에 있는 값 하나를 들어내
		}
	};
}

function generateRandomValue(min, max) {
	let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
	//여기서 max-min+1은 최댓값 최소값 사이에서 랜덤값 구하는 공식. +min은 최소값 보장
	return randomNum;
}

let enemyList = [];

//적군의 위치
function Enemy() {
	this.x = 0;
	this.y = 0;
	this.init = function () {
		this.y = 0;
		this.x = generateRandomValue(0, canvas.width - 50);
		//적군이 나오는 x,y의 최대좌표 0, 캔버스높이에서 적군의 크기만큼 뺀값
		enemyList.push(this);
	};
	this.update = function () {
		//적을 아래로 내려오게 만드는
		this.y += 2; //적군 속도 조절
		if (this.y >= canvas.height - 60) {
			//적군의 y값이 캔버스에서 내우주선의 값을 뺀값보다 높아지려한다
			gameOver = true;
			console.log("gameover");
		}
	};
}

function loadImage() {
	//이미지 주소설정
	backgroundImage = new Image();
	backgroundImage.src = "images/background.png";

	spaceshipImage = new Image();
	spaceshipImage.src = "images/spaceship.png";

	bulletImage = new Image();
	bulletImage.src = "images/bullet.png";

	enemyImage = new Image();
	enemyImage.src = "images/enemy.png";

	gameOverImage = new Image();
	gameOverImage.src = "images/gameover.png";
}

//키보드 누르기
let keysDown = {}; //어떤 버튼이 눌렸는지 여기에 한번에 저장
function setupKeyboardListener() {
	//키보드 움직이면 event발생
	document.addEventListener("keydown", function (event) {
		keysDown[event.key] = true; //내가 누른 방향키를 저장
		// console.log("키다운에들어간 객체값은?", keysDown);
	});
	document.addEventListener("keyup", function (event) {
		delete keysDown[event.key];
		// console.log("버튼 올릴때", keysDown); //방향키버튼 떼면 키다운값 삭제

		if (event.key == " ") {
			//스페이스바 올릴때
			createBullet(); //총알 생성
		}
	});
}

//총알 생성 함수
function createBullet() {
	console.log("총알 생성");
	let b = new Bullet(); //총알 함수 객체 생성
	b.init(); //내 우주선 값으로 초기화 하는 함수
	console.log("총알리스트", bulletList);
}

//적군 생성
function createEnemy() {
	const interval = setInterval(function () {
		let e = new Enemy(); //적군 객체생성
		e.init(); //초기화
	}, 1000); //1초마다 생성
}

//방향키 이동할때
function update() {
	if ("ArrowRight" in keysDown) {
		//오른쪽 버튼 누르면 오른쪽으로 이동
		spaceshipX += 3;
	}
	if ("ArrowLeft" in keysDown) {
		//왼쪽 버튼 누르면 왼쪽으로 이동
		spaceshipX -= 3;
	}
	if (spaceshipX <= 0) {
		//내 우주선이 왼쪽 끝으로 가면 x좌표의 0까지만 가게.
		spaceshipX = 0;
	}
	if (spaceshipX >= canvas.width - 60) {
		//캔버스의 400중 우주선 크기 뺀값만큼 오른쪽 끝
		spaceshipX = canvas.width - 60;
	}

	//총알을 위로 올리는 함수
	for (let i = 0; i < bulletList.length; i++) {
		if (bulletList[i].alive) {
			//살아있는 총알일때
			bulletList[i].update(); //총알배열의 update함수 호출
			bulletList[i].checkHit(); //총알의 y값을 업데이트하면서 총알이 적군을 쳤느냐
		}
	}
	//적군을 계속 내리는 함수
	for (let i = 0; i < enemyList.length; i++) {
		enemyList[i].update();
	}
}

//이미지 보여지는 함수
//렌더란? 이미지를 그린다
//drawImage함수는 원래 있는 함수로 이미지를 필수로 넣어줘야함
function render() {
	ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); //뒷배경
	ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY); //내 우주선 기본 좌표
	ctx.fillText(`Score:${score}`, 20, 20); //스코어 보여줌
	ctx.fillStyle = "white"; //하얀색
	ctx.font = "20px arial";

	for (let i = 0; i < bulletList.length; i++) {
		//총알리스트만큼
		if (bulletList[i].alive) {
			//살아있는 총알이면 보여줘
			ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
		}
	} //총알리스트의 i번째의 x,y값

	for (let i = 0; i < enemyList.length; i++) {
		//적군리스트
		ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
	}
}

function main() {
	if (!gameOver) {
		//게임오버 함수가 false이면
		update(); //내가 누른대로 좌표값을 업데이트하고
		render(); //그려준다
		requestAnimationFrame(main); //애니메이션처럼 프레임을 계속 호출하는것.메인을 계속불러서 렌더를 계속 하는 함수
	} else {
		ctx.drawImage(gameOverImage, 10, 100, 380, 380); //게임오버 함수가 ture가 되면 게임오버 이미지 띄우기
	}
} //렌더를 계속 보여줘야함

loadImage(); //이미지 불러오기
setupKeyboardListener(); //키보드 이벤트 셋팅
createEnemy();
main(); //이미지 랜더하기
